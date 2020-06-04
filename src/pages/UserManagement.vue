<template>
  <q-page>
    <div class="q-pa-md q-gutter-md">
      <q-list bordered padding class="rounded-borders">
        <div class="row">
          <q-item-section avatar>
            <q-btn v-on:click="refresh()" flat round icon="refresh" />
          </q-item-section>
          <q-item-section>
            <b>Scada Users</b>
          </q-item-section>
        </div>
        <q-separator />
        <q-item :key="user.Username" v-for="user in users" clickable v-ripple>
          <q-item-section avatar top>
            <q-avatar size="lg" color="blue" text-color="white"
              >{{ user.Fullname.getInitials() }}
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">{{ user.Fullname }}</q-item-label>
            <q-item-label caption>{{ user.Username }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <div class="row">
              <q-btn
                dense
                text-color="amber"
                flat
                icon="create"
                v-on:click="openEditUserModel({ open: true, user })"
              />
              <q-btn
                text-color="red"
                flat
                dense
                icon="delete"
                v-on:click="deleteUser(user)"
              />
            </div>
          </q-item-section>
        </q-item>
        <div class="q-mr-sm text-right">
          <q-btn
            v-on:click="openCreateUserModel(true)"
            round
            color="secondary"
            icon="add"
          />
        </div>
      </q-list>

      <q-dialog v-model="showEditModal">
        <q-card style="min-width: 330px">
          <q-card-section class="q-pb-none">
            <div class="text-h6">User Edit</div>
          </q-card-section>

          <q-card-section>
            <div class="q-mb-sm">
              <q-input
                v-model="editModel.Username"
                dense
                label="Username"
                readonly
              >
                <template v-slot:prepend>
                  <q-icon name="face" />
                </template>
              </q-input>
            </div>
            <div class="q-mb-sm">
              <q-input
                dense
                label="Full Name"
                v-model="editModel.Fullname"
                :rules="[val => !!val || 'Field is required']"
              >
                <template v-slot:prepend>
                  <q-icon name="perm_contact_calendar" />
                </template>
              </q-input>
            </div>
            <div class="q-mb-sm">
              <q-input
                dense
                v-model="editModel.Privilege"
                label="Privilege"
                :rules="[val => !!val || 'Field is required']"
              >
                <template v-slot:prepend>
                  <q-icon name="edit_attributes" />
                </template>
              </q-input>
            </div>
            <div class="q-mb-sm">
              <q-input
                dense
                type="password"
                label="Password"
                v-model="editModel.Password"
                :rules="[val => !!val || 'Field is required']"
              >
                <template v-slot:prepend>
                  <q-icon name="vpn_key" />
                </template>
              </q-input>
            </div>
            <div class="q-mb-sm">
              <q-input
                dense
                type="password"
                label="Password"
                v-model="editModel.confirm"
                :rules="[val => !!val || 'Field is required']"
              >
                <template v-slot:prepend>
                  <q-icon name="vpn_key" />
                </template>
              </q-input>
            </div>
          </q-card-section>
          <q-card-actions align="right" class="text-primary q-pt-none ">
            <q-btn
              color="secondary"
              icon-right="send"
              label="UPDATE"
              v-on:click="updateUser()"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="showCreateModal">
        <q-card style="min-width: 330px">
          <q-card-section class="q-pb-none">
            <div class="text-h6">Create User</div>
          </q-card-section>

          <q-card-section>
            <div class="q-mb-sm">
              <q-input
                v-model="createModel.Username"
                dense
                label="Username"
                :rules="[val => !!val || 'Field is required']"
              >
                <template v-slot:prepend>
                  <q-icon name="face" />
                </template>
              </q-input>
            </div>
            <div class="q-mb-sm">
              <q-input
                dense
                v-model="createModel.Fullname"
                label="Full Name"
                :rules="[val => !!val || 'Field is required']"
              >
                <template v-slot:prepend>
                  <q-icon name="perm_contact_calendar" />
                </template>
              </q-input>
            </div>
            <div class="q-mb-sm">
              <q-input
                dense
                label="Privilege"
                v-model="createModel.Privilege"
                :rules="[val => !!val || 'Field is required']"
              >
                <template v-slot:prepend>
                  <q-icon name="edit_attributes" />
                </template>
              </q-input>
            </div>
            <div class="q-mb-sm">
              <q-input
                dense
                type="password"
                label="Password"
                v-model="createModel.Password"
                :rules="[val => !!val || 'Field is required']"
              >
                <template v-slot:prepend>
                  <q-icon name="vpn_key" />
                </template>
              </q-input>
            </div>
            <div class="q-mb-sm">
              <q-input
                dense
                type="password"
                label="Password"
                v-model="createModel.confirm"
                :rules="[val => !!val || 'Field is required']"
              >
                <template v-slot:prepend>
                  <q-icon name="vpn_key" />
                </template>
              </q-input>
            </div>
          </q-card-section>
          <q-card-actions align="right" class="text-primary q-pt-none ">
            <q-btn
              color="secondary"
              icon-right="send"
              label="CREATE"
              v-close-popup
              v-on:click="createUser()"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { bus } from "../boot/scadainit";
import { client } from "../boot/scadainit";
export default {
  name: "UserManagement",
  data() {
    return {
      users: [],
      myvalue: "",
      rpcgetallusers: "",
      rpccreateuser: "",
      rpcdeleteuser: "",
      rpcedituser: "",
      responsejson: "",
      showCreateModal: false,
      showEditModal: false,
      createModel: {
        Username: "",
        Fullname: "",
        Privilege: "",
        Password: "",
        confirm: ""
      },
      editModel: {
        Username: "",
        Fullname: "",
        Privilege: "",
        Password: "",
        confirm: ""
      },
      card: true
    };
  },
  methods: {
    refresh: function() {
      console.log("refresh");
      this.rpcgetallusers = client.callrpc("Access", "GetAllUsers", "{}");
    },
    openCreateUserModel: function(value) {
      console.log("clicked");
      this.showCreateModal = value;
    },
    openEditUserModel: function(value) {
      this.showEditModal = value.open;
      if (value.open) {
        this.editModel.Username = value.user.Username;
        this.editModel.Fullname = value.user.Fullname;
        this.editModel.Privilege = value.user.Privilege;
      }
    },
    createUser() {
      if (
        this.createModel.Username === "" ||
        this.createModel.Fullname === "" ||
        this.createModel.Privilege === "" ||
        this.createModel.Password === "" ||
        this.createModel.confirm === ""
      ) {
        return;
      }
      if (this.createModel.Password != this.createModel.confirm) return;
      this.showCreateModal = false;
      this.rpccreateuser = client.callrpc(
        "Access",
        "CreateUser",
        JSON.stringify(this.createModel)
      );
    },
    updateUser() {
      if (
        this.editModel.Username === "" ||
        this.editModel.Fullname === "" ||
        this.editModel.Privilege === "" ||
        this.editModel.Password === "" ||
        this.editModel.confirm === ""
      ) {
        return;
      }
      if (this.editModel.Password != this.editModel.confirm) return;
      this.showEditModal = false;
      this.rpcedituser = client.callrpc(
        "Access",
        "ChangeUser",
        JSON.stringify(this.editModel)
      );
    },
    deleteUser(user) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Would you like delete '" + user.Fullname + "'?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.rpcdeleteuser = client.callrpc(
            "Access",
            "DeleteUser",
            JSON.stringify(user)
          );
        });
    }
  },
  created: function() {
    this.refresh();
    bus.$on("RpcResult", data => {
      if (data.uid === this.rpcgetallusers) {
        this.users = [];
        for (var key in data.message) {
          this.users.push(data.message[key]);
        }
      }
      if (data.uid === this.rpccreateuser) {
        if (data.message.Id == 201) {
          this.refresh();
        }
      }
      if (data.uid === this.rpcdeleteuser) {
        if (data.message.Id == 200) {
          this.refresh();
        }
      }
      if (data.uid === this.rpcedituser) {
        if (data.message.Id == 200) {
          this.refresh();
        }
      }
    });
  }
};
</script>

<style scoped></style>
