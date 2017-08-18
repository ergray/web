export function oldBill(bill) { // eslint-disable-line import/prefer-default-export
  if (bill.date) return bill

  return {
    ...bill,
    date: bill.introduced,
    itemNumber: bill.number,
    sponsors: bill.sponsors.map(s => `${s.first_name} ${s.last_name}`),
    text: bill.summary,
    uid: bill.bill_uid,
  }
}
