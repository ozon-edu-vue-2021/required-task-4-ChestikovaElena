<template>
  <div class="form">
    <form @submit.prevent="formSubmit" class="form-content">
      <section class="form-section">
        <h2 class="section-title">Личные данные</h2>
        <div class="row">
          <Input
            v-model="formData.secondName"
            id="secondName"
            label="Фамилия"
            placeholder="Иванов"
            dataError="formData.secondNameErrors"
          />
          <Input
            v-model="formData.name"
            id="name"
            label="Имя"
            placeholder="Иван"
            dataError=""
          />
          <Input
            v-model="formData.patronym"
            id="patronym"
            label="Отчество"
            placeholder="Иванович"
            dataError=""
          />
        </div>
        <div class="row">
          <Input
            v-model="formData.birthDay"
            id="birthDay"
            type="date"
            label="Дата рождения"
            dataError=""
          />
        </div>
        <div class="row">
          <Input
            v-model="formData.email"
            id="email"
            type="email"
            label="E-mail"
            placeholder="test-email@mail.com"
            dataError=""
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
              v-model="formData.passport.series"
              id="passportSeries"
              label="Серия паспорта"
              dataError=""
            />
            <Input
              v-model="formData.passport.number"
              id="passportNumber"
              label="Номер паспорта"
              dataError=""
            />
            <Input
              v-model="formData.passport.issuanceDate"
              id="passporIssuanceDate"
              type="date"
              label="Дата выдачи"
              dataError=""
            />
          </div>
        </div>
        <div v-else class="form-section">
          <div class="row row-modify--half">
            <Input
              v-model="formData.stranger.lastName"
              id="strangerLastName"
              label="Фамилия на латинице"
              dataError=""
            />
            <Input
              v-model="formData.stranger.name"
              id="strangerName"
              label="Имя на латинице"
              dataError=""
            />
          </div>
          <div class="row row-modify--passport">
            <Input
              v-model="formData.stranger.passport.number"
              id="strangerPassportNumber"
              label="Номер паспорта"
              dataError=""
            />
            <Select
              :values="citizenships"
              label="Страна выдачи"
              field="nationality"
              @selected="updatePassportCountry"
            />
            <Select
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
            <RadioButton label="Нет" value="no" v-model="formData.isChangedName" />
            <RadioButton label="Да" value="yes" v-model="formData.isChangedName" />
          </div>
        </div>
        <div v-if="isShowChangedName" class="row row-modify--half">
          <Input
            v-model="formData.changedLastName"
            id="changedLastName"
            label="Фамилия"
            dataError="formData.changedLastNameErrors"
          />
          <Input
            v-model="formData.changedName"
            id="changedName"
            label="Имя"
            dataError="formData.changedNameErrors"
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

export default {
  components: {
    Input,
    RadioButton,
    Select,
  },
  data() {
    return {
      timeMask: null,
      citizenships: null,
      passportTypes: null,
      formData: {
        secondName: "",
        name: "",
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
          lastNmae: "",
          name: "",
        }
      }
    };
  },
  computed: {
    isShowChangedName() {
      return this.formData.isChangedName === 'yes'
    },
    isButtonDisabled() {
      return !(
        this.formData.secondName !== "" &&
        this.formData.name !== "" &&
        this.formData.birthDay &&
        this.formData.email &&
        this.formData.gender &&
        ((this.formData.nationality === "Russia" &&
          this.formData.passport.series !== "" &&
          this.formData.passport.number !== "" &&
          this.formData.passport.issuanceDate !== ""
        ) || (this.formData.nationality !== "Russia" && 
          this.formData.stranger.passport.number !== "" &&
          this.formData.stranger.passport.country !== "" &&
          this.formData.stranger.passport.type !== ""
        )) &&
        ((this.formData.isChangedName === "no") ||
        (this.formData.isChangedName === "yes" &&
          this.formData.changedLastName !== "" &&
          this.formData.changedName !== ""
        ))
      )
    }
  },
  created() {
    this.citizenships = citizenships;
    this.passportTypes = passportTypes;
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
      this.formData.nationality = value;
    },
    updatePassportType(value) {
      this.formData.stranger.passport.type = value;
    },
    updatePassportCountry(value) {
      this.formData.stranger.passport.country = value;
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
  grid-gap: 20px;
  width: 1000px;
  margin-top: 30px;
}

.section-title {
  margin-top: 0;
  margin-bottom: 0;
}

.row {
  display: grid;
  grid-template-columns: auto auto auto;
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
