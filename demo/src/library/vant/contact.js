// import { constants } from "fs";

export default {
  covert (consignee) {
    if (consignee.country == '110101') {
      consignee.country = '110101'
    } else {
      consignee.country = '120101'
    }
    return {
      tel: consignee.phone,
      addressDetail: consignee.address,
      areaCode: consignee.country,
      identity_card_photo: consignee.identity_card_photo,
      identity_rear_photo: consignee.identity_rear_photo,
      // identity_card_photo: consignee.identity_card_photos.base64image,// 删了.base64image
      // identity_rear_photo: consignee.identity_rear_photos.base64image,
      isDefault: consignee.is_default,
      ...consignee
    }
  }
}
