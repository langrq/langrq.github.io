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



  function join(ary, n) {
    var result = ''
    for (var i = 0; i < ary.length - 1; i++) {
      result += ary[i] + '' + n
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

  function dropRight(ary, num) {
    if (num == undefined) num = 1
    if (num > ary.length) num = ary.length
    ary.length = ary.length - num
    return ary
  }

  function fill(ary, value, start = 0, end = ary.length) {
    for (var i = start; i < end; i++) {
      ary[i] = value
    }
    return ary
  }


  function findIndex(ary, predicate, start = 0) {

    for (var i = start; i < ary.length; i++) {
      if (typeof predicate == 'function') {

      } else if (typeof predicate == 'object') {

      } else if (typeof predicate == 'string') {

      }

    }
    return -1
  }

  function findLastindex() {

  }

  function flatten(ary) {
    var result = []
    for (var i = 0; i < ary.length; i++) {
      if (typeof ary[i] == 'string') {
        result.push(ary[i])
      } else if (typeof ary[i] == 'object') {
        for (var j = 0; j < ary[i].length; j++) {
          result.push(ary[i][j])
        }
      }
    }
    return result
  }

  function flattenDeep(ary, ans = []) {
    for (var i = 0; i < ary.length; i++) {
      var result = ary[i]
      if (typeof result == 'object') {
        flattenDeep(result, ans)   //递归内部数组
      } else {
        ans.push(result)
      }
    }
    return ans
  }

  return {
    chunk,
    compact,
    compact,
    join,
    last,
    lastIndexOf,
    drop,
    dropRight,
    fill,
    findIndex,
    findLastindex,
    flatten,
    flattenDeep,
  }

}()
