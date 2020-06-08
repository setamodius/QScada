"use strict";
import mqtt from "mqtt";

export class ScadaClient {
  constructor(bus) {
    this.innerbus = bus;
  }

  callrpc = function(worker, functionname, data) {
    var uid = this.createuid();
    var topic =
      "Scada/to/" +
      worker +
      "/from/" +
      this.options.clientid +
      "/" +
      functionname +
      "/req/" +
      uid;
    console.log(topic);
    this.innerclient.publish(topic, data, {
      qos: 2,
      retain: false
    });
    return uid;
  };

  connect(host, username, password) {
    let offlinewillmessage = {
      status: "disconnect",
      timestamp: new Date().toISOString()
    };
    const workername = "WebConfigurator";
    this.options = {
      username: username,
      password: password,
      clientid: workername,
      will: {
        topic: "MQTT/" + workername + "-" + username + "/Status",
        payload: JSON.stringify(offlinewillmessage),
        qos: 2,
        retain: true
      }
    };

    var client = mqtt.connect(host, this.options);
    this.innerclient = client;
    var self = this;
    client.on("error", function(error) {
      console.log(error);
      self.innerbus.$emit("ErrorReceived", {
        error
      });
    });

    client.on("connect", function() {
      self.innerbus.$emit("WorkerStatusChanged", {
        isconnected: true
      });
      client.subscribe("MQTT/#", function() {});
      client.subscribe("MATP/#", function() {});
      client.subscribe(
        "Scada/to/" + this.options.clientid + "/from/+/+/+/+",
        function() {}
      );
      let onlinewillmessage = {
        status: "online",
        timestamp: new Date().toISOString()
      };
      client.publish(
        "MQTT/" +
          this.options.clientid +
          "-" +
          this.options.username +
          "/Status",
        JSON.stringify(onlinewillmessage),
        {
          qos: 2,
          retain: true
        }
      );
    });
    client.on("offline", function() {
      self.innerbus.$emit("WorkerStatusChanged", {
        isconnected: false
      });
    });
    var workerlist = {};
    this.workers = workerlist;
    client.on("message", function(topic, message) {
      var parsedtag = topic.split("/");
      if (parsedtag[0] === "MQTT") {
        var worker = parsedtag[1].split("-")[0];
        var user = parsedtag[1].split("-")[1];
        if (message.length == 0) {
          delete workerlist[worker + user];
        } else {
          var messagejson = JSON.parse(message);
          workerlist[worker + user] = {
            workername: worker,
            username: user,
            timestamp: new Date(messagejson.timestamp),
            status: messagejson.status
          };
        }
        self.innerbus.$emit("OtherWorkersStatus", workerlist);
      }

      if (parsedtag[0] === "Scada" && parsedtag.length == 8) {
        if (message.length != 0) {
          client.publish(topic, "", {
            qos: 2,
            retain: true
          });
          var uid = parsedtag[7];
          self.innerbus.$emit("RpcResult", {
            uid,
            message: JSON.parse(message)
          });
        }
      }
      //MATP/Ventilation/Jetfan/T4KJF01/IsFailed/Online
      if (
        parsedtag[0] === "MATP" &&
        parsedtag.length == 6 &&
        parsedtag[5] === "Online"
      ) {
        if (message.length != 0) {
          self.innerbus.$emit("TagChanged", {
            target: topic,
            message: JSON.parse(message)
          });
        }
      }
    });
  }

  createuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  removeworker(worker) {
    var topic = "MQTT/" + worker.workername + "-" + worker.username + "/Status";
    this.innerclient.publish(topic, "", {
      qos: 2,
      retain: true
    });
  }

  getworkers() {
    return this.workers;
  }
}
