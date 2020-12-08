var langrq = function () {
  function compact(ary) {
    var result = []
    for (var i = 0; i < ary.length; i++) {
      if (ary[i]) {
        result.push(ary[i])
      }
    }
    return result
  }
  function chunk(ary, n) {
    var result = []
    for (var i = 0; i < ary.length; i) {
      var digit = []
      for (var j = 0; j < n; j++) {
        digit.push(ary[i])
        i++
        if (!ary[i]) break
      }
      result.push(digit)

    }
    return result
  }
  return {
    chunk,
    compact,
  }

}()
