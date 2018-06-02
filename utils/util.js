function convertToStarsArray (stars) {
  var half = stars % 10
  var on = (stars - half) / 10
  var result = new Array(5).fill('off')
  for (var i = 0; i < on; i++) {
    result[i] = 'on'
  }
  half && (result[i] = 'half')
  return result
}

function http (url, callBack, ...args) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": "json"
    },
    success: function (res) {
      callBack(res.data, ...args)
    },
    fail: function (error) {
      console.log(error)
    }
  })
}

function convertToCastString (casts) {
  return casts.reduce((result, curr) => {
    result.push(curr.name)
    return result
  },[]).join('/')
}

function convertToCastInfos (casts) {
  return casts.reduce((result, curr) => {
    let cast = {
      img: curr.avatars ? curr.avatars.large : '',
      name: curr.name
    }
    result.push(cast)
    return result
  }, [])
}

module.exports = {
  convertToStarsArray,
  http,
  convertToCastString,
  convertToCastInfos
}