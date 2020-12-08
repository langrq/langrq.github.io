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

  function compact(ary) {
    var result = []
    for (var i = 0; i < ary.length; i++) {
      if (typeof ary[i] === "number" && ary[i] != 0) {
        result.push(ary[i])
      }
    }
    return result
  }


  function join(ary, n) {
    var result = ''
    for (var i = 0; i < ary.length - 1; i++) {
      result += ary[i] + n
    }
    result = result + ary[i]
    return result
  }

  function last(ary) {
    return result = ary[ary.length - 1]
  }

  function lastIndexOf(ary, value, start) {
    var n = ary.length
    if (start == undefined) start = n - 1
    for (var i = start; i >= 0; i--) {
      if (ary[i] === value) {
        return i
      }
    }
    return -1
  }

  function drop(ary, num) {
    var n = ary.length
    var result = []
    if (num == undefined) num = 1
    var result = []
    for (var i = num; i < n; i++) {
      result.push(ary[i])
    }
    return result
  }




  return {
    chunk,
    compact,
    compact,
    join,
    last,
    lastIndexOf,
  }

}()
