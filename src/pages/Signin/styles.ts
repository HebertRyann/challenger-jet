import styled from 'styled-components'

export const Contanier = styled.div`
  display: flex;
  justify-content: center;

  .placeholder-no-fix {
    text-transform: none;
    border: 1px solid #ddd !important;
    ::placeholder {
      text-transform: capitalize !important;
    }
  }
`

export const Content = styled.div`
  body {
    background-color: #eff3f8 !important;
  }
  .logo {
    margin: 0 auto;
    margin-top: 60px;
    padding: 15px;
    text-align: center;
  }

  .content {
    background-color: white;
    -webkit-border-radius: 7px;
    -moz-border-radius: 7px;
    -ms-border-radius: 7px;
    -o-border-radius: 7px;
    border-radius: 7px;
    width: 400px;
    margin: 40px auto 10px auto;
    padding: 30px;
    padding-top: 10px;
    overflow: hidden;
    position: relative;
  }

  .content h3 {
    color: #4db3a5;
    text-align: center;
    font-size: 28px;
    font-weight: 400 !important;
  }

  .content h4 {
    color: #555;
  }

  .content .hint {
    color: #999;
    padding: 0;
    margin: 15px 0 7px 0;
  }

  .content -form,
  .content .forget-form {
    padding: 0px;
    margin: 0px;
  }

  .content .form-control {
    border: none;
    height: 43px;
    background-color: #fff;
  }
  .content .form-control:focus,
  .content .form-control:active {
    border: 1px solid #c3ccda;
  }
  .content .form-control::-moz-placeholder {
    color: #8290a3;
    opacity: 1;
  }
  .content .form-control:-ms-input-placeholder {
    color: #8290a3;
  }
  .content .form-control::-webkit-input-placeholder {
    color: #8290a3;
  }

  .content select.form-control {
    padding-left: 9px;
    padding-right: 9px;
  }

  .content .forget-form {
    display: none;
  }

  .content .register-form {
    display: none;
  }

  .content .form-title {
    font-weight: 300;
    margin-bottom: 25px;
  }

  .content .form-actions {
    clear: both;
    border: 0px;
    border-bottom: 1px solid #eee;
    padding: 25px 30px 25px 30px;
    margin-left: -30px;
    margin-right: -30px;
  }
  .content .form-actions > .btn {
    margin-top: -2px;
  }

  .content .form-actions .checkbox {
    margin-left: 0;
    padding-left: 0;
  }

  .content .forget-form .form-actions {
    border: 0;
    margin-bottom: 0;
    padding-bottom: 20px;
  }

  .content .register-form .form-actions {
    border: 0;
    margin-bottom: 0;
    padding-bottom: 0px;
  }

  .content .form-actions .btn {
    margin-top: 1px;
  }

  .content .form-actions .btn {
    font-weight: 600;
    padding: 10px 20px !important;
  }

  .content .form-actions .btn-default {
    font-weight: 600;
    padding: 10px 25px !important;
    color: #6c7a8d;
    background-color: #ffffff;
    border: none;
  }

  .content .form-actions .btn-default:hover {
    background-color: #fafaff;
    color: #45b6af;
  }

  .content .forget-password {
    font-size: 14px;
    float: right;
    display: inline-block;
    margin-top: 10px;
  }

  .content .check {
    color: #8290a3;
  }

  .content .rememberme {
    margin-left: 8px;
  }

  .content .create-account {
    margin: 0 -40px -30px -40px;
    padding: 15px 0 17px 0;
    text-align: center;
    background-color: #6c7a8d;
    -webkit-border-radius: 0 0 7px 7px;
    -moz-border-radius: 0 0 7px 7px;
    -ms-border-radius: 0 0 7px 7px;
    -o-border-radius: 0 0 7px 7px;
    border-radius: 0 0 7px 7px;
  }
  .content .create-account > p {
    margin: 0;
  }

  .content .create-account p a {
    font-weight: 600;
    font-size: 14px;
    color: #c3cedd;
  }

  .content .create-account a {
    display: inline-block;
    margin-top: 5px;
  }

  /* footer copyright */
  .copyright {
    text-align: center;
    margin: 0 auto 30px 0;
    padding: 10px;
    color: #7a8ca5;
    font-size: 13px;
  }

  @media (max-width: 440px) {
    /***
  Login page
  ***/
    .logo {
      margin-top: 10px;
    }
    .content {
      width: 280px;
      margin-top: 10px;
    }
    .content h3 {
      font-size: 22px;
    }
    .forget-password {
      display: inline-block;
      margin-top: 20px;
    }
    -options .social-icons {
      float: left;
      padding-top: 3px;
    }
    .checkbox {
      font-size: 13px;
    }
  }
`
