<template>
  <div class="wrap-faq" data-aos="fade-up" data-aos-duration="2000">
    <div class="title-1">
      <div class="title-folder">
        <div class="title-folder-top">
          <span> {{ $t('faq.title') }}</span>
        </div>
        <div class="title-folder-center">{{ $t('faq.faq') }}</div>
      </div>
    </div>
    <div class="container-lang">
      <el-collapse v-model="activeNames" accordion @change="handleChange">
        <el-collapse-item :title="$t('footer.col-1')" :name="1">
          <div>
            {{ $t('footer.col-content-1') }}
          </div>
        </el-collapse-item>
        <el-collapse-item :title="$t('footer.col-2')" :name="2">
          <div>
            <p>
              {{ $t('footer.col-content-2') }}
            </p>
            <p style="margin-top: 10px">
              {{ $t('footer.col-content-2,2') }}
            </p>
            <p style="margin-top: 10px">
              {{ $t('footer.col-content-2,3') }}
            </p>
            <p style="margin-top: 10px">
              {{ $t('footer.col-content-2,4') }}
            </p>
            <p style="margin-top: 10px">
              {{ $t('footer.col-content-2,5') }}
            </p>
            <p style="margin-top: 10px">
              {{ $t('footer.col-content-2,6') }}
            </p>
            <p style="margin-top: 10px">
              {{ $t('footer.col-content-2,7') }}
            </p>
            <p style="margin-top: 10px">
              {{ $t('footer.col-content-2,8') }}
            </p>
          </div>
        </el-collapse-item>
        <el-collapse-item :title="$t('footer.col-3')" :name="3">
          <div>
            {{ $t('footer.col-content-3') }}
          </div>
        </el-collapse-item>
        <el-collapse-item :title="$t('footer.col-4')" :name="4">
          <div>
            {{ $t('footer.col-content-4') }}
          </div>
        </el-collapse-item>
        <!-- <el-collapse-item :title="$t('footer.col-5')" :name="5">
          <div>
            {{ $t("footer.col-content-5") }}
          </div>
        </el-collapse-item>
        <el-collapse-item :title="$t('footer.col-6')" :name="6">
          <div>
            {{ $t("footer.col-content-6") }}
          </div>
        </el-collapse-item>
        <el-collapse-item :title="$t('footer.col-7')" :name="7">
          <div>
            {{ $t("footer.col-content-7") }}
          </div>
        </el-collapse-item>
        <el-collapse-item :title="$t('footer.col-8')" :name="8">
          <div>
            {{ $t("footer.col-content-8") }}
          </div>
        </el-collapse-item> -->
      </el-collapse>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'LandingFaq',
    data() {
      return {
        activeName: '1',
        form: {
          name: '',
          email: '',
          phone: '',
          message: ''
        },
        validate: {
          email: true,
          phone: true,
          message: true,
          name: true
        }
      }
    },
    methods: {
      handleChange(val) {
        this.activeNames = val
      },
      handleBlurEmail() {
        const re = /\S+@\S+\.\S+/
        this.validate.email = re.test(this.form.email)
      },
      handleBlurName() {
        this.validate.name = this.form.name !== ''
      },
      handleBlurPhone() {
        this.validate.phone = this.form.phone !== ''
      },
      handleBlurMessage() {
        this.validate.message = this.form.message !== ''
      },
      handleSendEmail() {
        this.handleBlurEmail()
        this.handleBlurName()
        this.handleBlurPhone()
        this.handleBlurMessage()
        if (!this.validate.name || !this.validate.email || !this.validate.message || !this.validate.phone) {
          return
        }
        // if (this.form.name && this.form.email && this.form.message && this.validate.email) {
        //   const subject = `${this.form.name} - ${this.form.email} - ${this.form.phone} has sent a question`
        //   // const data = {
        //   //   recipientEmail: 'chaulongdbp@gmail.com',
        //   //   code: '',
        //   //   fullName: '',
        //   //   subject,
        //   //   sendFrom: this.form.email,
        //   //   reason: '',
        //   //   content: this.form.message
        //   // }
        //
        //   // axios.post('https://test-blockchain-api.beedu.vn/api/v1/submitform', data).then(() => {
        //   //   // this.$message({
        //   //   //   showClose: true,
        //   //   //   message: 'Email sent successfully',
        //   //   //   type: 'success'
        //   //   // })
        //   //   this.formSuccess = true
        //   //   setTimeout(() => {
        //   //     this.formSuccess = false
        //   //   }, 2000)
        //   //
        //   //   this.form = {
        //   //     name: '',
        //   //     email: '',
        //   //     phone: '',
        //   //     message: ''
        //   //   }
        //   //   this.validate = {
        //   //     email: true,
        //   //     phone: true,
        //   //     message: true,
        //   //     name: true
        //   //   }
        //   // })
        // }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .wrap-faq {
    position: relative;
    background: url('../../../assets/images/landing/back-blue.png');
    background-repeat: no-repeat;
    background-position-y: inherit;
    background-position-x: right;
    padding-bottom: 120px;
    scroll-margin-top: 280px;
  }
  .title-1 {
    margin-bottom: 42px;
    text-align: center;

    .title-folder-top {
      justify-content: center;
      color: #fff;
      font-size: 18px;
      line-height: 27px;
      font-weight: 400;
    }

    .title-folder-center {
      font-size: 36px;
      color: #fff;
      line-height: 44px;
      margin-top: 12px;
      font-family: archivo-expanded;
    }

    .title-folder-bottom {
      font-size: 18px;
      color: #ececec;
    }

    @media (min-width: 740px) and (max-width: 1024px) {
      padding-top: 80px;
    }

    @media (max-width: 739px) {
      text-align: left;
      padding-left: 20px;
      padding-top: 0px;
      margin-bottom: 36px;
      .title-folder-top {
        justify-content: left;
        font-size: 14px;
        color: #e4e7ec;
      }
      .title-folder-center {
        margin-top: 4px !important;
        font-size: 24px;
        color: #e4e7ec;
      }
    }
  }

  @media (min-width: 740px) and (max-width: 1024px) {
    .wrap-faq {
      padding-bottom: 80px;
    }
    .title-1 {
      flex-shrink: 0;

      .title-folder-center {
        font-size: 32px;
      }
    }
    .form-question {
      align-items: center;
      width: 85% !important;

      textarea {
        width: 360px !important;
      }

      .fullname {
        input {
          width: 360px !important;
        }
      }

      .yourphone,
      .email {
        input {
          width: 168px !important;
        }
      }

      .btn-submit-box {
        width: 360px !important;
      }
    }
  }

  @media (max-width: 767px) {
    .form-question {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 710px !important;
      bottom: -165px !important;

      textarea {
        width: 330px !important;
      }

      .fullname {
        input {
          width: 330px !important;
        }
      }

      .be-flex {
        display: block !important;
      }

      .yourphone,
      .email {
        input {
          width: 330px !important;
        }
      }

      .btn-submit-box {
        width: auto !important;
      }

      .title-1 {
        margin-right: 0 !important;
        padding-top: 0px !important;

        .title-folder-center {
          margin-bottom: 0 !important;
        }
      }

      .fl-right {
        width: 100%;
      }

      .btn-submit {
        width: 100% !important;
      }
    }
    .grid.wide {
      padding: 0 20px;
    }

    ::v-deep.wrap-faq {
      div[role='tab'] {
        div[role='button'] {
          padding-bottom: 70px;
        }
      }
    }
  }

  .el-icon-arrow-right:before {
    content: '\e6e1' !important;
  }
</style>
