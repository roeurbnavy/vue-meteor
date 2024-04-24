<script setup>
import { onMounted, ref } from "vue";

// import { subscribe, autorun } from 'vue-meteor-tracker'
// import { LinksCollection } from '/imports/api/links'

// subscribe('links')
// const links = autorun(() => LinksCollection.find({}).fetch()).result

const links = ref([]);

const getData = () => {
  Meteor.call("fetchData", (error, res) => {
    if (error) {
      console.log("error", error);
    } else {
      console.log("res", res);
      links.value = res;
    }
  });
};

const addData = () => {
  Meteor.call(
    "insertLink",
    { title: "VUe 3", url: "www.google.com" },
    (error, res) => {
      if (error) {
        console.log("error", error);
      } else {
        getData();
      }
    }
  );
};

const updateData = () => {
  Meteor.call(
    "updateLink",
    { _id: "3eDHp6yab59fdf64M", title: "VUe 2", url: "www.google.com" },
    (error, res) => {
      if (error) {
        console.log("error", error);
      } else {
        getData();
      }
    }
  );
};

const removeData = (id) => {
  const selector = { _id: id };
  Meteor.call("removeLink", selector, (error, res) => {
    if (error) {
      console.log("error", error);
    } else {
      getData();
    }
  });
};

onMounted(() => {
  getData();
});
</script>

<template>
  <h2 class="text-xl my-6 font-semibold">Learn Meteor!</h2>
  <button
    @click="addData"
    class="bg-green-700 hover:bg-green-900 text-white py-2 px-4 rounded"
  >
    Add Data
  </button>

  <button
    @click="updateData"
    class="bg-green-700 hover:bg-green-900 text-white py-2 px-4 rounded"
  >
    Update Data
  </button>

  <ul class="list-disc underline">
    <li v-for="link of links" :key="link._id" class="hover:text-green-700">
      <a :href="link.url" target="_blank">{{ link.title }}</a>
      <button
        @click="removeData(link._id)"
        class="bg-green-700 hover:bg-green-900 text-white py-2 px-4 rounded"
      >
        Remove Data
      </button>
    </li>
  </ul>
</template>
