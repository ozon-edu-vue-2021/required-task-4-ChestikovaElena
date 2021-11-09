<template>
  <div class="form">
    <form @submit.prevent="formSubmit" class="form-content" novalidate>
      <section class="form-section">
        <h2 class="section-title">Личные данные</h2>
        <div class="row">
          <Input
            v-model="$v.formData.secondName.$model"
            key="secondName"
            label="Фамилия"
            placeholder="Иванов"
            :dataError="error.secondName"
            :dirty="$v.formData.secondName.$dirty"
            @blur="blurHandler('secondName')"
          />
          <Input
            v-model="$v.formData.firstName.$model"
            key="firstName"
            label="Имя"
            placeholder="Иван"
            :dataError="error.firstName"
            :dirty="$v.formData.firstName.$dirty"
            @blur="blurHandler('firstName')"
          />
          <Input
            v-model="$v.formData.patronym.$model"
            key="patronym"
            label="Отчество"
            placeholder="Иванович"
            :dirty="$v.formData.patronym.$dirty"
            :dataError="error.patronym"
            @blur="blurHandler('patronym')"
          />
        </div>
        <div class="row">
          <Input
            v-model="$v.formData.birthDay.$model"
            key="birthDay"
            type="date"
            label="Дата рождения"
            :dataError="error.birthDay"
            :dirty="$v.formData.birthDay.$dirty"
            @blur="blurHandler('birthDay')"
          />
        </div>
        <div class="row">
          <Input
            v-model="$v.formData.email.$model"
            key="email"
            type="email"
            label="E-mail"
            placeholder="test-email@mail.com"
            :dataError="error.email"
            :dirty="$v.formData.email.$dirty"
            @blur="blurHandler('email')"
          />
        </div>
        <div>
          <h3 class="radio-label">Пол</h3>
          <div class="row row-modify--radio">
            <RadioButton label="Мужской" value="male" v-model="formData.gender" />
            <RadioButton label="Женский" value="female" v-model="formData.gender" />
          </div>
        </div>
      </section>
      <section class="form-section">
        <h2 class="section-title">Паспортные данные</h2>
        <div class="row">
          <Select
            key="nationality"
            :values="citizenships"
            label="Гражданство"
            placeholder="Выберите национальность"
            field="nationality"
            @selected="updateNationality"
          />
        </div>
        <div
          v-if="formData.nationality === 'Russia'"
          class="row row-modify--passport"
        >
          <div class="row">
            <Input
              v-model="$v.formData.passport.series.$model"
              key="passportSeries"
              mask="## ##"
              placeholder="00 00"
              label="Серия паспорта"
              :dataError="error.passport.series"
              :dirty="$v.formData.passport.series.$dirty"
              @blur="blurHandler('series')"
            />
            <Input
              v-model="$v.formData.passport.number.$model"
              key="passportNumber"
              mask="№ ######"
              placeholder="№ 000000"
              label="Номер паспорта"
              :dataError="error.passport.number"
              :dirty="$v.formData.passport.number.$dirty"
              @blur="blurHandler('number')"
            />
            <Input
              v-model="formData.passport.issuanceDate"
              key="passporIssuanceDate"
              type="date"
              label="Дата выдачи"
              dataError=""
            />
          </div>
        </div>
        <div v-else class="form-section">
          <div class="row row-modify--half">
            <Input
              v-model="$v.formData.stranger.lastName.$model"
              key="strangerLastName"
              label="Фамилия на латинице"
              :dataError="error.stranger.lastName"
              :dirty="$v.formData.stranger.lastName.$dirty"
              @blur="blurHandler('lastName')"
            />
            <Input
              v-model="$v.formData.stranger.name.$model"
              key="strangerName"
              label="Имя на латинице"
              :dataError="error.stranger.name"
              :dirty="$v.formData.stranger.name.$dirty"
              @blur="blurHandler('name')"
            />
          </div>
          <div class="row row-modify--passport">
            <Input
              v-model="formData.stranger.passport.number"
              key="strangerPassportNumber"
              label="Номер паспорта"
              dataError=""
            />
            <Select
              key="passportCountry"
              :values="citizenships"
              label="Страна выдачи"
              field="nationality"
              @selected="updatePassportCountry"
            />
            <Select
              key="passportType"
              :values="passportTypes"
              label="Тип паспорта"
              field="type"
              @selected="updatePassportType"
            />
          </div>
        </div>
        <div>
          <h3 class="radio-label">Меняли ли фамилию или имя?</h3>
          <div class="row row-modify--radio">
            <RadioButton
              label="Нет"
              value="no"
              v-model="formData.isChangedName"
              @change="changeHandler"
            />
            <RadioButton
              label="Да"
              value="yes"
              v-model="formData.isChangedName"
            />
          </div>
        </div>
        <div v-if="isShowChangedName" class="row row-modify--half">
          <Input
            v-model="$v.formData.changedLastName.$model"
            key="changedLastName"
            label="Предыдущая фамилия"
            :dataError="error.changedLastName"
            :dirty="$v.formData.changedLastName.$dirty"
            @blur="blurHandler('changedLastName')"
          />
          <Input
            v-model="$v.formData.changedName.$model"
            key="changedName"
            label="Предыдущее имя"
            :dataError="error.changedName"
            :dirty="$v.formData.changedName.$dirty"
            @blur="blurHandler('changedName')"
          />
        </div>
      </section>
      <div class="row row-modify--control">
        <button
          type="submit"
          :class="['button', {
            'button--disabled': isButtonDisabled
          }]"
        >
          Отправить
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Input from "./Input.vue";
import RadioButton from "./RadioButton.vue";
import Select from "./Select.vue";
import citizenships from "@/assets/data/citizenships.json";
import passportTypes from "@/assets/data/passport-types.json";
import { email, helpers, required } from "vuelidate/lib/validators";

const cyrilicLetter = helpers.regex("cyrilicLetter", /^[\u0400-\u04ff]*$/);
const latinLetter = helpers.regex("latinLetter", /^[a-zA-Z]*$/);
const formatSeries = helpers.regex("lengthFour", /^\d{2} \d{2}$/);
const formatNumber = helpers.regex("lengthFour", /^№ \d{6}$/);

export default {
  components: {
    Input,
    RadioButton,
    Select,
  },
  const: {
    citizenships: null,
    passportTypes: null,
  },
  data() {
    return {
      formData: {
        secondName: "",
        firstName: "",
        patronym: "",
        birthDay: null,
        email: "",
        gender: "",
        nationality: "Russia",
        passport: {
          series: "",
          number: "",
          issuanceDate: "",
        },
        isChangedName: false,
        changedLastName: "",
        changedName: "",
        stranger: {
          passport: {
            number: "",
            country: "",
            type: "",
          },
          lastName: "",
          name: "",
        }
      },
      error: {
        secondName: "",
        firstName: "",
        patronym: "",
        changedLastName: "",
        changedName: "",
        birthDay: "",
        email: "",
        passport: {
          series: "",
          number: ""
        },
        stranger: {
          lastName: "",
          name:"",
        },
      },
    };
  },
  computed: {
    isShowChangedName() {
      return this.formData.isChangedName === 'yes'
    },
    isButtonDisabled() {
      return this.$v.$invalid;
    },
  },
  created() {
    this.citizenships = citizenships;
    this.passportTypes = passportTypes;
  },
  validations: {
    formData: {
      secondName: {
        required,
        cyrilicLetter,
      },
      firstName: {
        required,
        cyrilicLetter,
      },
      patronym: {
        cyrilicLetter,
      },
      changedLastName: {
        cyrilicLetter,
      },
      changedName: {
        cyrilicLetter,
      },
      birthDay: {
        required,
        maxValue: value => value < new Date().toISOString(),
      },
      email: {
        required,
        email,
      },
      passport: {
        series: {
          formatSeries,
        },
        number: {
          formatNumber,
        }
      },
      stranger: {
        lastName: {
          latinLetter
        },
        name: {
          latinLetter
        },
      }
    }
  },
  methods: {
    formSubmit() {
      if (!this.isButtonDisabled) {
        if (!this.formData.emailErrors) {
          console.log("UPDATE API EVENT", this.formData);
        } else {
          console.log("FAILED UPDATE API EVENT");
        }
      }
    },
    updateNationality(value) {
      if (value !== "Russia") {
        this.formData.passport = {
          series: "",
          number: "",
          issuanceDate: "",
        };
      }  else {
        this.formData.stranger = {
          passport: {
            number: "",
            country: "",
            type: "",
          },
          lastName: "",
          name: "",
        };
      }
      this.formData.nationality = value;
    },
    updatePassportType(value) {
      this.formData.stranger.passport.type = value;
    },
    updatePassportCountry(value) {
      this.formData.stranger.passport.country = value;
    },
    changeHandler() {
      this.formData.changedLastName = "";
      this.formData.changedName = "";
    },
    blurHandler(validateField) {
      if (validateField === "secondName" || validateField === "firstName") {
        if (!this.$v.formData[validateField].required && this.$v.formData[validateField].$dirty) {
          this.error[validateField] = "Обязательно для заполнения";
        } else if (!this.$v.formData[validateField].cyrilicLetter && this.$v.formData[validateField].$dirty) {
          this.error[validateField] = "Можно использовать только русские буквы"
        } else {
          this.error[validateField] = "";
        }
      }
      if (validateField === "patronym" || validateField === "changedLastName" || validateField === "changedName") {
        if (!this.$v.formData[validateField].cyrilicLetter && this.$v.formData[validateField].$dirty) {
          this.error[validateField] = "Можно использовать только русские буквы";
        } else {
          this.error[validateField] = "";
        }
      }
      if (validateField === "lastName" || validateField === "name") {
        if (!this.$v.formData.stranger[validateField].latinLetter && this.$v.formData.stranger[validateField].$dirty) {
          this.error.stranger[validateField] = "Можно использовать только латинские буквы";
        } else {
          this.error.stranger[validateField] = "";
        }
      }
      if (validateField === "birthDay") {
        if (!this.$v.formData[validateField].required && this.$v.formData[validateField].$dirty) {
          this.error[validateField] = "Обязательно для заполнения";
        } else if (!this.$v.formData[validateField].maxValue && this.$v.formData[validateField].$dirty) {
          this.error[validateField] = "Дата не может быть больше сегодняшней даты"
        } else {
          this.error[validateField] = "";
        }
      }
      if (validateField === "email") {
        if (!this.$v.formData[validateField].required && this.$v.formData[validateField].$dirty) {
          this.error[validateField] = "Обязательно для заполнения";
        } else if (!this.$v.formData[validateField].email && this.$v.formData[validateField].$dirty) {
          this.error[validateField] = "Введите корректный email"
        } else {
          this.error[validateField] = "";
        }
      }
      if (validateField === "series") {
        if (!this.$v.formData.passport[validateField].formatSeries && this.$v.formData.passport[validateField].$dirty) {
          this.error.passport[validateField] = "Введите серию паспорта из 4-х цифр"
        } else {
          this.error.passport[validateField] = "";
        }
      }
      if (validateField === "number") {
        if (!this.$v.formData.passport[validateField].formatNumber && this.$v.formData.passport[validateField].$dirty) {
          this.error.passport[validateField] = "Введите номер паспорта из 6-и цифр"
        } else {
          this.error.passport[validateField] = "";
        }
      }
    }
  },
};
</script>

<style scoped>
.form {
  display: flex;
  justify-content: center;
}

.form-content {
  margin: 20px auto 50px;
}

.form-section {
  display: grid;
  grid-gap: 25px;
  width: 1000px;
  margin-top: 30px;
}

.section-title {
  margin-top: 0;
  margin-bottom: 0;
}

.row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
}

.row-modify--passport {
  grid-template-columns: 25% 25% auto;
}

.row-modify--half {
  grid-template-columns: auto auto;
}

.row-modify--control {
  margin-top: 100px;
  grid-template-columns: auto;
  justify-content: end;;
}

.row-modify--radio {
  grid-template-columns: 10% 10% auto;
}

.radio-label {
  margin: 0 0 6px;
  font-size: 16px;;
  color: #9b9d9f;
  font-weight: 600;
}

.button {
  padding: 20px 40px;
  align-items: center;
  background-color: #005bff;
  border: none;
  border-radius: 6px;
  color: #fff;
  font-size: 16px;;
  font-weight: 700;
}

.button:hover {
  background-color: #003ead;
}

.button--disabled,
.button--disabled:hover {
  background-color: #b3bcc5;
}

</style>
