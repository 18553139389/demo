import monent from 'moment'

export default {
  covert (coupon) {
    let startAt = monent(coupon.created).format('X')
    let endAt = monent(coupon.expired).format('X')
    return {
      id: coupon.id,
      available: 1,
      discount: 0,
      denominations: (coupon.coupon_attributes.amount ? parseFloat(coupon.coupon_attributes.amount) : 0) * 100,
      originCondition: (coupon.coupon_attributes.spend_amount ? parseFloat(coupon.coupon_attributes.spend_amount) : 0) * 100,
      reason: '',
      value: (coupon.coupon_attributes.amount ? parseFloat(coupon.coupon_attributes.amount) : 0) * 100,
      currencyValue: (coupon.coupon_attributes.currency_amount ? parseFloat(coupon.coupon_attributes.currency_amount) : 0) * 100,
      name: coupon.name,
      startAt: startAt,
      endAt: endAt,
      categoryCondition: coupon.coupon_attributes.category_condition,
      type: coupon.coupon_attributes.coupon_type === 'Spend X Got Y Credit' ? 'spend_x_got_y_credit' : '',
      typeName: coupon.coupon_attributes.name ? coupon.coupon_attributes.name : coupon.name
    }
  }
}
