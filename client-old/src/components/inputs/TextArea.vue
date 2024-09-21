<template>
    <div class="input__container">
      <div :class="'input__effect ' + filled">
        <textarea
        :value="value"
        :placeholder="placeholder"
        :class="'effect ' + has__icon"
        @focus="show=!show"
        @blur="show=!show"
        @input="$emit('input', $event.target.value)">
        </textarea>
        <label :style="{color:color}">{{label}}</label>
        <span class="focus__border" :style="focus__border"></span>
      </div>
      <span class="input__hint" v-if="show">{{hint}}</span>
      <i class="material-icons input__icon">{{icon}}</i>
    </div>
</template>

<script>
export default
{
  data() {
    return {
      show: false,
    };
  },
  computed: {
    filled() {
      if (!this.show && this.value) {
        return 'has__content';
      }
      return '';
    },
    has__icon() {
      if (this.icon) {
        return 'input__has__icon';
      }
      return '';
    },
    focus__border() {
      return {
        'background-color': this.color,
      };
    },
  },
  props: {
    value: {
      type: String,
      required: false,
      default: '',
    },
    label: {
      type: String,
      required: false,
      default: '',
    },
    hint: {
      type: String,
      required: false,
      default: '',
    },
    icon: {
      type: String,
      required: false,
      default: '',
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    color: {
      type: String,
      required: false,
      default: 'indigo',
    },
  },
};
</script>

<style scoped>
::placeholder {
  opacity:.4;
}

textarea{
  color: #555;
  width: 100%;
  min-height: 300px;
  box-sizing: border-box;
  letter-spacing: 1px;
  outline:none;
}

.input__container {
  max-width: 500px;
  padding:.5rem .5rem 0 0;
}

.input__effect {
  width: 100%;
  margin: 1.5rem 0rem 1.5rem 0;
  position: relative;
}

.input__icon {
  position: relative;
  left: 0rem;
  top: -3.5rem;
  opacity:.3;
}
.input__hint {
  float: left;
  width: 100%;
  margin:-1.2rem 0 0 0;
  position: relative;
  font-size:.8rem; opacity:.6;
}

.input__has__icon {
  padding-left: 2rem!important;
}

.effect {
  border: 0;
  padding: 4px 0;
  border-bottom: 1px solid #ccc;
  background-color: transparent;
}

.effect ~ .focus__border {
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: indigo;
  transition: 0.4s;
}

.effect:focus ~ .focus__border ,
.has-content.effect ~ .focus__border {
  width: 100%;
  transition: 0.4s;
}

.effect ~ label {
  position: absolute;
  left: 0;
  width: 100%;
  top: -1.3rem;
  color: #aaa;
  transition: 0.3s;
  z-index: -1;
  letter-spacing: 0.5px;
}

.effect:focus ~ label,
.has__content.effect ~ label {
  top: -1rem;
  font-size: 12px;
  color: indigo;
  transition: 0.3s;
}
</style>
