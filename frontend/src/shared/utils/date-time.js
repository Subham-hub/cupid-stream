export const currentDate = () => {
  var today = new Date()
  var dd = String(today.getDate()).padStart(2, '0')
  var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
  var yyyy = today.getFullYear()

  today = mm + '/' + dd + '/' + yyyy
  return today
}

export const currentTime = () => {
  const dubbleZero = parseInt('00')
  const time = new Date()
  const formatedDate = `${dubbleZero + time.getHours()}:${
    dubbleZero + time.getMinutes()
  }:${dubbleZero + time.getSeconds()}`
  return formatedDate
}
