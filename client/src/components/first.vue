<template>
  <div>
    <h1>Hello Yo - test page {{ email }}</h1>
    <div class="update">
    </div>
    <input class="email" type="text" name="" v-model="email" value="">
  </div>
</template>

<script>
export default {
  name: 'First',
  props: undefined,
  element: '.update',
  data() {
    return {
      email: '.email'.value,
    };
  },
};
// export default {
//     name: "ListItemsSfc",
//     props: ['items'],
//     data() {
//         return {
//             selectedItem: null
//         }
//     },
//     methods: {
//         onItemSelected(item) {
//             this.selectedItem = item;
//         }
//     }
// }
</script>
