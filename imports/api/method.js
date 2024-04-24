// import { LinksCollection,LinksCollection1,LinksCollection2 } from "./links";
import links from "./links";

Meteor.methods({
  fetchData: async () => {
    const list = await links.find().fetch();

    return list;
  },
  insertLink: async ({ title, url }) => {
    return await links.insertAsync({ title, url, createdAt: new Date() });
  },
  updateLink: async ({ _id, title, url }) => {
    return await links.updateAsync(
      { _id },
      { $set: { title, url, updatedAt: new Date() } }
    );
  },
  removeLink: async ({ _id }) => {
    // console.log("_id", _id);

    return await links.removeAsync({ _id });
  },
});
