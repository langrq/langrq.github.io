var langrq = function () {




    //辅助函数
    function iteratee(predicate) {
        if (typeof predicate === 'function') {
            return predicate
        }
        if (typeof predicate === "string") {
            return property(predicate)
        }
        if (Array.isArray(predicate)) {
            return matchesProperty(predicate)
        }
        if (typeof predicate === "object") {
            return matches(predicate)
        }

    }


    // --------------------------------------

    function compact(ary) {                            //删除数组内所有false的
        var result = []
        for (var i = 0; i < ary.length; i++) {
            if (ary[i]) {
                result.push(ary[i])
            }
        }
        return result
    }


    function chunk(ary, n) {                                 //创建一个元素数组，将其分为大小长度的组。 如果无法均匀分割数组，则最后一块将是剩余的元素。
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
    function forEach(ary, action) {                               //可以断的foreach循环
        for (var i = 0; i < ary.length; i++) {
            if (action(ary[i], i, ary) === false) {
                break
            }
        }
    }


    function difference(array, ...nums) {                           //发现数组内的不同
        var result = []
        var differ = [].concat(...nums)
        for (var j = 0; j < array.length; j++) {
            if (array.indexOf(differ[j]) == -1)
                result.push(array[j])
        }
        return result
        //普通写法
        // var differ = [].concat(...nums)
        // return array.filter(function (item) {
        //     return differ.indexOf(item) == -1
        // })
        // var differ = [].concat(...nums)
        // return array.filter(item =>
        //     differ.indexOf(item) == -1
        // )             // 高阶函数简略写法

    }


    function differenceBy(...array) {
        var after = array[array.length - 1]
        after = iteratee(after)
        var target = array.shift()
        if (Array.isArray(target)) {
            for (var key of target) {
                var ary1 = after(key)
            }
            for (var item of array) {
                var ary2 = after(item)
            }
            return result = difference(ary1, ary2)
        }

    }

    function differenceWith(array, values, comparator) {                    //此方法类似于_.difference，不同之处在于它接受比较器，该比较器被调用以将数组的元素与值进行比较。 结果值的顺序和参考由第一个数组确定。 比较器由两个参数调用：（arrVal，othVal）。
        var result = []
        for (var ary of array) {
            for (var val of values) {
                if (!comparator(ary, val)) {
                    result.push(ary)
                }
            }
        }
        return result
    }

    function ary(f, n = f.length) {
        return function (...args) {
            return f(...args.sliece(0, n))
        }
    }

    function before(n, func) {
        var c = 0
        var reuslt = 0
        return function (...args) {
            if (c < n) {
                result = func.call(this, ...args)
            } else {
                return
            }
            r++
        }
    }

    function after(n, func) {

    }


    function flip(func) {
        return function (...args) {
            return func(...args.reverse())
        }
    }

    function negate(predicate) {
        return function () {
            return !predicate(...args)
        }
    }
    function spread(func) {
        return function (ary) {
            return func.apply(this, ary)
        }
    }

    function drop(ary, num) {                          //从开头删除数组
        var n = ary.length
        var result = []
        if (num == undefined) num = 1
        var result = []
        for (var i = num; i < n; i++) {
            result.push(ary[i])
        }
        return result
    }

    function dropRight(ary, num) {                   //创建一个数组切片，从末尾开始删除n个元素。
        if (num == undefined) num = 1
        if (num > ary.length) num = ary.length
        ary.length = ary.length - num
        return ary
    }

    function dropRightWhile(ary, predicate = null) {            //创建一个数组切片，其中不包括从末尾放置的元素。 元素将被删除，直到谓词返回false。 谓词由三个参数调用：（值，索引，数组）。

    }


    // function dropRightWhile(arr, predicate) {
    //   let type = checkType(predicate)
    //   let res = []
    //   for (let i = 0; i < arr.length; i++) {
    //     if (type == "[object Function]") {
    //       if (predicate(arr[i]) == false) {
    //         res.push(arr[i])
    //       }
    //     }
    //     if (type == "[object Object]") {
    //       let item = arr[i]
    //       let propA = Object.getOwnPropertyNames(item)
    //       let propB = Object.getOwnPropertyNames(predicate)
    //       for (let j = 0; j < propB.length; j++) {
    //         let propName = propB[j]
    //         if (item[propName] !== predicate[propName]) {
    //           res.push(item)
    //         }
    //         break
    //       }
    //     }
    //     if (type == "[object Array]") {
    //       let item = arr[i]
    //       if (item[predicate[0]] !== predicate[1]) {
    //         res.push(arr[i])
    //       }
    //     }
    //     if (type == "[object String]") {
    //       let item = arr[i]
    //       if (predicate in item) {
    //         res.push(arr[i])
    //       }
    //     }
    //   }
    //   return res
    // }








    function fill(ary, value, start = 0, end = ary.length) {          //使用从开始到结束（但不包括结束）的值填充数组的元素。
        for (var i = start; i < end; i++) {
            ary[i] = value
        }
        return ary
    }


    function findIndex(ary, predicate, start = 0) {                //此方法类似于_.find，不同之处在于它返回第一个元素谓词的索引返回true，而不是元素本身。

        for (var i = start; i < ary.length; i++) {
            if (typeof predicate == 'function') {

            } else if (typeof predicate == 'object') {

            } else if (typeof predicate == 'string') {

            }

        }
        return -1
    }

    function findLastindex() {                                     //此方法类似于_.findIndex，不同之处在于它从右到左遍历collection的元素。

    }

    function flatten(ary) {                                       //展平阵列深一层。
        var result = []
        for (var i = 0; i < ary.length; i++) {
            if (typeof ary[i] == 'string') {
                result.push(ary[i])
            } else if (typeof ary[i] == 'object') {
                for (var j = 0; j < ary[i].length; j++) {
                    result.push(ary[i][j])
                }
            } else {
                result.push(ary[i])
            }
        }
        return result
    }

    function flattenDeep(ary, ans = []) {                        //递归展平数组。
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


    function flattenDepth(ary, depth, ans = [], count = 0) {   //将数组递归展平至指定深度。

        for (var i = 0; i < ary.length; i++) {
            var result = ary[i]
            if (typeof result == 'object' && count < depth) {
                count++

                flattenDepth(result, depth, ans, count)   //递归内部数组

            } else {
                ans.push(result)
            }
        }
        return ans
    }

    function fromPairs(ary) {                         //返回对值组成的对象。
        var map = {};
        for (var i = 0; i < ary.length; i++) {
            map[ary[i][0]] = ary[i][1];
        }
        return map;
    }

    function head(ary) {                              //获得数组的首个值
        return ary[0]
    }

    function indexOf(ary, value, start = 0) {       //获取在数组中找到第一个值的索引。 如果fromIndex为负，则用作距数组结尾的偏移量。

        for (var i = start; i < ary.length; i++) {
            if (ary[i] === value) {
                return i
            }
        }
        return -1
    }

    function initial(ary) {               //获取除数组的最后一个元素以外的所有元素。
        ary.length = ary.length - 1
        return ary
    }

    function intersection(...ary) {   //创建包含在所有给定数组中的唯一值数组进行相等性比较。 结果值的顺序和参考由第一个数组确定。
        var inter = [].concat(...ary)
        var result = []
        for (var i = 0; i < inter.length; i++) {
            for (var j = i + 1; j < inter.length; j++) {
                if (inter[i] == inter[j]) break
            }
            break
        }
        result.push(inter[i])
        return result
    }


    function join(ary, n) {                               //将数组中的所有元素转换为由分隔符分隔的字符串。
        var result = ''
        for (var i = 0; i < ary.length - 1; i++) {
            result += ary[i] + '' + n
        }
        result = result + ary[i]
        return result
    }



    function last(ary) {                                 //获取数组的最后一个元素。
        return result = ary[ary.length - 1]
    }


    function lastIndexOf(ary, value, start) {           //此方法类似于_.indexOf，不同之处在于它从右到左遍历array的元素。
        var n = ary.length
        if (start == undefined) start = n - 1
        for (var i = start; i >= 0; i--) {
            if (ary[i] === value) {
                return i
            }
        }
        return -1
    }

    function nth(array, start = 0) {              //获取数组索引n处的元素。 如果start为负，则从末尾返回第start个元素。
        var n = array.length
        if (start < 0) {
            start = n + start
        }
        return array[start]
    }

    function pull(array, ...val) {
        var result = []                                            //从数组中删除所有给相等定值
        for (var i = 0; i < array.length; i++) {
            var target = false
            for (var j = 0; j < val.length; j++) {
                if (array[i] == val[j]) {
                    target = true
                    break
                }
            }
            if (target == false) result.push(array[i])
        }
        return result
    }


    function pullAll(array, ary) {
        var result = []                                            //从数组中删除所有给数组相等定值
        for (var i = 0; i < array.length; i++) {
            var target = false
            for (var j = 0; j < ary.length; j++) {
                if (array[i] == ary[j]) {
                    target = true
                    break
                }
            }
            if (target == false) result.push(array[i])
        }
        return result
    }

    function reverse(array) {              //反转数组的值
        var n = array.length
        for (var i = 0; i < n / 2; i++) {
            temp = array[i]
            array[i] = array[n - i - 1]
            array[n - i - 1] = temp
        }
        return array
    }

    function sortedIndex(array, value) {       //在排序数列中 可以获得插入的值的索引位置
        var n = array.length
        for (var i = 0; i < n; i++) {
            if (array[i] >= value) return i
        }
        return array.length
    }


    function sortedIndexOf(array, value) {    //在排序数列中  可以获得插入的值的索引位置，不在范围内则返回-1
        var n = array.length
        if (array[0] > value) return -1
        for (var i = 0; i < n; i++) {
            if (array[i] >= value) return i

        }
        return -1
    }
    function sortedLastIndex(array, value) {    //在排序数列中 从后向前可以获得插入的值的索引位置
        var n = array.length
        for (var i = n - 1; i > 0; i--) {
            if (array[i] >= value) return i
        }
        return array.length
    }

    function sortedLastIndexOf(array, value) {    //在排序数列中  从后向前可以获得插入的值的索引位置，不在范围内则返回-1
        var n = array.length
        if (array[0] > value) return -1
        for (var i = n - 1; i > 0; i--) {
            if (array[i] >= value) return i

        }
        return -1
    }

    function sortedUniq(array) {              //排序数组中的去重
        var n = array.length
        for (var i = 0; i < n - 1; i++) {
            if (array[i] == array[i + 1]) {
                array[i + 1] == array[i + 2]
                i++
            }
        }
        return array
    }

    function sortedUniqBy(array, predicate) {    //高阶排序数组去重
        var map = {}
        var result = []                           //迭代数组的数 
        for (var ary of array) {                  //通过 对象 来去重 
            var nel = predicate(ary)
            if (!map[nel]) {
                map[nel] = 1
                result.push(ary)
            }

        }
        return result
    }

    function tail(array) {                      //获得除第一个数的后续数组
        return array.shift()
    }

    function take(array, n = 1) {                 //创建一个数组切片，其中数组从头开始取n个元素。
        var result = []
        if (n > array.length) n = array.length
        for (var i = 0; i < n; i++) {
            result.push(array[i])
        }
        return result
    }

    function takeRight(array, n = 1) {            //从右创建一个数组切片，其中数组从头开始取n个元素。
        var result = []
        var c = n
        for (var i = array.length - 1; i >= 0 && c > 0; i--) {
            result.unshift(array[i])
            c--
        }
        return result
    }

    function union(...arrays) {                   //使用SameValueZero进行相等性比较，从所有给定的数组中依次创建唯一值的数组。
        var map = {}
        var result = []
        var nel = [].concat(...arrays)
        for (var ary of nel) {
            if (!map[ary]) {
                map[ary] = 1
                result.push(ary)
            }
        }
        return result
    }

    function uniq(array) {                         //单数组去重
        var map = {}
        var result = []
        for (var ary of array) {
            if (!map[ary]) {
                map[ary] = 1
                result.push(ary)
            }
        }
        return result
    }

    function unzip(array) {           //将zip组合成的函数的反解构
        var max = 0
        var result = []
        array.forEach(item => (max = max > item.length ? max : item.length))
        for (var i = 0; i < max; i++) {
            var single = []
            for (var ary of array) {
                single.push(ary[i])
            }
            result.push(single)
        }
        return result
    }

    function without(array, ...vals) {              //使用SameValueZero创建排除了所有给定值的数组。
        var result = vals.filter(item => {
            !(array.includes(item))
        });
        return result
    }

    function xor(...array) {                            //数组或集
        var ary = [].concat(...array)
        var map = {}
        var result = []
        for (var digit of ary) {
            if (!map[digit]) {
                map[digit] = 1
            } else {
                map[digit]++
            }
        }
        for (var digit in map) {
            if (map[digit] == 1) result.push(Number(digit))
        }
        return result
    }

    function zip(...array) {        //创建一个分组元素数组，其中第一个元素包含给定数组的第一个元素，第二个元素包含给定数组的第二个元素，依此类推。
        var max = 0
        var result = []

        array.forEach(item => (max = max > item.length ? max : item.length))
        for (var i = 0; i < max; i++) {
            var single = []
            for (var ary of array) {
                single.push(ary[i])
            }
            result.push(single)

        }
        return result
    }

    function zipObject(props = [], values = [], _) {   //创建一个分组元素对象，其中第一个元素包含给定数组的第一个元素，第二个元素包含给定数组的第二个元素，依此类推。
        var map = {}
        var i = 0
        for (var key of props) {
            map[key] = values[i]
            i++
        }
        return map
    }

    function zipWith(...array) {
        var iteratee = array.pop()
        var result = zip(...array)
        return res = result.map(item => iteratee(...item))
    }

    function bind(f, thisArg, ...partials) {
        return function (...args) {
            var copy = partials.slice()
            for (var i = 0; i < copy.length; i++) {
                if (copy[i] === window) {
                    copy[i] = args.shift()
                }
            }
            return f.call(thisArg, ...copy, ...args)
        }
        // 调用方式  f2 = bind(f,null,window,window,value )
    }

    function matchesProperty(iteratee) {
        return function (obj) {
            return obj[iteratee[0]] === iteratee[1];
        }
    }

    function isMatch(obj, src) {                      //判断src是否在obj内包含存在
        for (var key in src) {
            if (src[key] && typeof src[key] == 'object') {
                if (!isMatch(src[key], obj[key])) {
                    return false
                }
            } else {
                if (obj[key] !== src[key]) {
                    return false
                }
            }

        }
        return true
    }


    function matches(src) {                                //isMathch的绑定第二个参数的方式就是matches
        return bind(isMatch, null, window, src)
    }



    function get(object, path, defaultValue) {    //获取对象路径上的值。如果未定义已解析的值，则默认值将在其位置返回。
        var digitname = path.split(".")
        for (var name of digitname) {
            if (name in Object(object)) {
                object = object[name]
            } else {
                return defaultValue
            }
        }
        return object


        //reduce做法  返回有问题
        // var names = path.split('.')
        // return names.reduce((object, name) => {
        //     if (name in object) {
        //         return object[name]
        //     } else {
        //         return defaultValue
        //     }
        // }, object)

        //递归写法
        // if (path.length == 0) {
        //     return object
        // }
        // if(object == null){
        //     return defaultValue
        // }
        // return get(object[name[0], names.slice(1)], defaultValue) 
    }


    function property(path) {                 //返回目标obj上的 path的值 //高阶函数
        var names = path.split('.')
        return function (obj) {
            for (var name of names) {
                if (name in Object(obj)) {
                    obj = obj[name]
                } else {
                    return
                }
            }
            return obj
        }

        //用get的写法
        // return function (obj) {
        //     return get(obj, path)
        // }
    }





    function forOwn(obj, iterator) {
        var hasOwn = object.prototype.hasOwnproperty
        for (var key in obj) {
            if (hasOwn.call(obj, k)) {
                if (iterator(obj[key], key, obj) == false) break
            }
        }
        return obj
    }

    // function bind(f, thisArg, ...fixedArgs) {
    //     return function (...args) {

    //         return f.call(thisArg, ...fixedArgs, ...args)
    //     }
    // }


    function mapValues(obj, mapper) {
        for (var key in obj) {
            var val = obj[key]
            result[key] = mapper(val, key, obj)

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
        drop,
        dropRight,
        fill,
        findIndex,
        findLastindex,
        flatten,
        flattenDeep,
        uniq,
        xor,
        without,
        zip,
        zipWith,
        zipObject,
        difference,
        unzip,
        union,
        flattenDepth,
        fromPairs,
        head,
        indexOf,
        initial,
        intersection,
        nth,
        pull,
        pullAll,
        reverse,
        sortedIndex,
        sortedIndexOf,
        sortedLastIndex,
        sortedLastIndexOf,
        sortedUniq,
        sortedUniqBy,
        tail,
        take,
        takeRight,
        differenceBy,
        differenceWith,
        forEach,
        get,
        bind,
        iteratee,
    }

}()
