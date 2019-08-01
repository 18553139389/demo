const PNF = require('google-libphonenumber').PhoneNumberFormat
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance()

export default {
  getCountryCode (number) {
    let prefix = number.substr(0, 2)
    let countryCode = 'AU'
    if (prefix !== '04' && number[0] === '1') {
      countryCode = 'CN'
    }
    return countryCode
  },
  mobileNumberInput (number) {
    let countryCode = this.getCountryCode(number)
    return phoneUtil.parseAndKeepRawInput(number, countryCode)
  },
  mobileNumberOutput (mobileNumber) {
    let formatMobileNumber = this.mobileNumberInput(mobileNumber)
    return phoneUtil.format(formatMobileNumber, PNF.E164)
  },
  mobileNumberInputWithCountryCode (number, countryCode) {
    return phoneUtil.parseAndKeepRawInput(number, countryCode)
  },
  mobileNumberOutputWithCountryCode (mobileNumber, countryCode) {
    let formatMobileNumber = this.mobileNumberInputWithCountryCode(mobileNumber, countryCode)
    return phoneUtil.format(formatMobileNumber, PNF.E164)
  }
}
