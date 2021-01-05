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
        } else if (typeof predicate === "object") {
            return matches(predicate)
        }
        if (typeof predicate === "boolean") {
            return predicate
        }
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

        //var names = path.split('.')
        // return get(object[name[0], names.slice(1)], defaultValue) 
    }



    function property(path) {                 //返回目标obj上的 path的值 //高阶函数
        var names = path.split(".")
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
    function matchesProperty(iteratee) {
        return function (obj) {
            return obj[iteratee[0]] === iteratee[1];
        }
    }


    function matches(src) {                                //isMathch的绑定第二个参数的方式就是matches
        return bind(isMatch, null, window, src)
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



    function difference(array, ...nums) {                           //发现数组内的不同
        var result = []
        var differ = [].concat(...nums)
        for (var j = 0; j < array.length; j++) {
            if (differ.indexOf(array[j]) == -1)
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
        if (Array.isArray(array[array.length - 1])) {
            return difference(array[0], ...(array.slice(1)))
        }

        var after = array.pop()
        after = iteratee(after)

        var target = array.shift()
        var differ = [].concat(...array)
        if (Array.isArray(target)) {
            var ary1 = []
            var ary2 = []
            for (var key of target) {
                var nel1 = after(key)
                ary1.push(nel1)
            }
            for (var item of differ) {
                var nel2 = after(item)
                ary2.push(nel2)
            }
            var result = difference(ary1, ary2)
            var res = []
            for (var k in ary1) {
                for (var it of result)
                    if (ary1[k] == it) {
                        res.push(target[k])
                    }
            }
            return res
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

    function dropRightWhile(obj, predicate) {            //创建一个数组切片，其中不包括从末尾放置的元素。 元素将被删除，直到谓词返回false。 谓词由三个参数调用：（值，索引，数组）。
        var f = iteratee(predicate)
        for (var i = obj.length - 1; i >= 0; i--) {
            if (!f(obj[i], predicate)) {
                return obj.slice(0, i + 1)
            }
        }

    }

    function dropWhile(obj, predicate) {
        var f = iteratee(predicate)
        for (var i = 0; i < obj.length; i++) {
            if (!f(obj[i])) break
        }
        return obj.slice(i)
    }


    function fill(ary, value, start = 0, end = ary.length) {          //使用从开始到结束（但不包括结束）的值填充数组的元素。
        for (var i = start; i < end; i++) {
            ary[i] = value
        }
        return ary
    }


    function findIndex(ary, predicate, start = 0) {                //此方法类似于_.find，不同之处在于它返回第一个元素谓词的索引返回true，而不是元素本身。
        var f = iteratee(predicate)
        for (var i = start; i < ary.length; i++) {
            if (f(ary[i])) {
                return i
            }
        }
        return -1
    }

    function findLastIndex(array, predicate, fromIndex = array.length - 1) {                                     //此方法类似于_.findIndex，不同之处在于它从右到左遍历collection的元素。
        var f = iteratee(predicate)
        for (var i = fromIndex; i >= 0; i--) {
            if (f(array[i])) {
                return i
            }
        }
        return -1
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


    function flattenDepth(ary, depth = 1) {   //将数组递归展平至指定深度。
        var ans = []
        for (var i = 0; i < ary.length; i++) {
            var result = ary[i]
            if (typeof result == 'object' && depth > 0) {
                ans.push(...flattenDepth(result, depth - 1))  //递归内部数组
            } else {
                ans.push(result)
            }
        }
        return ans

    }

    // function flattenDepth(ary, depth = 1) {
    //     var res = []
    //     for (var i = 0; i < ary.length; i++) {
    //         if (ary[i] instanceof Array && depth > 0) {
    //             res.push(...flattenDepth(ary[i], depth - 1))
    //         } else {
    //             res.push(ary[i])
    //         }
    //     }
    //     return res
    // }

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

    function intersectionBy(...array) {                        //和differenceby一样
        if (Array.isArray(array[array.length - 1])) {
            return intersection(array[0], ...(array.slice(1)))
        }

        var after = array.pop()
        after = iteratee(after)

        var target = array.shift()
        var differ = [].concat(...array)
        if (Array.isArray(target)) {
            var ary1 = []
            var ary2 = []
            for (var key of target) {
                var nel1 = after(key)
                ary1.push(nel1)
            }
            for (var item of differ) {
                var nel2 = after(item)
                ary2.push(nel2)
            }
            var result = intersection(ary1, ary2)
            var res = []
            for (var k in ary1) {
                for (var it of result)
                    if (ary1[k] == it) {
                        res.push(target[k])
                    }
            }
            return res
        }
    }

    function intersectionWith(objects, others, comparator) {
        var result = []
        for (var ary of objects) {
            for (var val of others) {
                if (comparator(ary, val)) {
                    result.push(ary)
                }
            }
        }
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

    function pullAllBy(...array) {

        var after = array.pop()
        after = iteratee(after)

        var target = array.shift()
        var differ = [].concat(...array)
        if (Array.isArray(target)) {
            var ary1 = []
            var ary2 = []
            for (var key of target) {
                var nel1 = after(key)
                ary1.push(nel1)
            }
            for (var item of differ) {
                var nel2 = after(item)
                ary2.push(nel2)
            }
            var result = pullAll(ary1, ary2)
            var res = []
            for (var k in ary1) {
                for (var it of result)
                    if (ary1[k] == it) {
                        res.push(target[k])
                    }
            }
            return res
        }
    }


    function pullAllWith(array, values, comparator) {
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

    function sortedIndexBy(...array) {
        if (Array.isArray(array[array.length - 1])) {
            return sortedIndex(array[0], ...(array.slice(1)))
        }

        var after = array.pop()
        after = iteratee(after)

        var target = array.shift()
        var differ = [].concat(...array)


        if (Array.isArray(target)) {
            var ary1 = []
            var ary2 = []
            for (var key of target) {
                var nel1 = after(key)
                ary1.push(nel1)
            }
            for (var item of differ) {
                var nel2 = after(item)
                ary2.push(nel2)
            }
            var result = sortedIndex(ary1, ary2)

            return result
        }
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

    function sortedLastIndexBy(...array) {
        if (Array.isArray(array[array.length - 1])) {
            return sortedLastIndex(array[0], ...(array.slice(1)))
        }

        var after = array.pop()
        after = iteratee(after)

        var target = array.shift()
        var differ = [].concat(...array)
        if (Array.isArray(target)) {
            var ary1 = []
            var ary2 = []
            for (var key of target) {
                var nel1 = after(key)
                ary1.push(nel1)
            }
            for (var item of differ) {
                var nel2 = after(item)
                ary2.push(nel2)
            }
            var result = sortedLastIndex(ary1, ary2)

            return result
        }
    }


    function sortedLastIndexOf(array, value) {    //在排序数列中  从后向前可以获得插入的值的索引位置，不在范围内则返回-1
        var n = array.length
        if (array[0] > value) return -1
        for (var i = n - 1; i >= 0; i--) {
            if (array[i] <= value) return i

        }
        return -1
    }

    function sortedUniq(array) {              //排序数组中的去重
        return uniq(array)
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
        return array.slice(1)
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

    function takeRightWhile(obj, predicate) {
        var f = iteratee(predicate)
        var result = []
        for (var i = obj.length - 1; i >= 0; i--) {
            if (!f(obj[i])) {
                break
            }
            result.unshift(obj[i])
        }
        return result
    }
    function takeWhile(obj, predicate) {
        var f = iteratee(predicate)
        var result = []
        for (var i = 0; i < obj.length; i++) {
            if (!f(obj[i])) {
                break
            }
            result.push(obj[i])
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

    function unionBy(...array) {
        if (Array.isArray(array[array.length - 1])) {
            return union(array[0], ...(array.slice(1)))
        }

        var after = array.pop()
        after = iteratee(after)

        var target = array.shift()
        var differ = [].concat(...array)
        if (Array.isArray(target)) {
            var ary1 = []
            var ary2 = []
            for (var key of target) {
                var nel1 = after(key)
                ary1.push(nel1)
            }
            for (var item of differ) {
                var nel2 = after(item)
                ary2.push(nel2)
            }
            var result = union(ary1, ary2)

            var res = []
            var results = ary1.concat(ary2)
            var back = target.concat(differ)
            for (var key of result) {
                res.push(back[results.indexOf(key)])
            }

            return res
        }

    }

    function unionWith(...arys) {

        let comparator = arys.pop()
        let left = arys.shift()
        let right = [].concat(...arys)
        for (let key of left) {
            right = right.filter(res => !comparator(res, key))
        }
        return left.concat(right)

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

    function uniqBy(...array) {                            //unionBy直接复制
        if (Array.isArray(array[array.length - 1])) {
            return uniq(array[0], ...(array.slice(1)))
        }

        var after = array.pop()
        after = iteratee(after)

        var target = array.shift()
        var differ = [].concat(...array)
        if (Array.isArray(target)) {
            var ary1 = []
            var ary2 = []
            for (var key of target) {
                var nel1 = after(key)
                ary1.push(nel1)
            }
            for (var item of differ) {
                var nel2 = after(item)
                ary2.push(nel2)
            }
            var result = uniq(ary1, ary2)

            var res = []
            var results = ary1.concat(ary2)
            var back = target.concat(differ)
            for (var key of result) {
                res.push(back[results.indexOf(key)])
            }

            return res
        }
    }

    function uniqWith(array, comparator) {
        var result = []
        for (var j = 0; j < array.length; j++) {
            for (var key of array) {
                if (!comparator(array[j], key) && result.indexOf(key) == -1) {
                    result.push(array[j])
                    break
                }
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

    function unzipWith(array, comparator) {
        var result = []
        for (var i = 0; i < array[0].length; i++) {
            var digit = comparator(array[0][i], array[1][i])
            result.push(digit)
        }
        return result
    }



    function without(array, ...vals) {                          //使用SameValueZero创建排除了所有给定值的数组。
        var result = []
        for (key of array) {
            if (!vals.includes(key)) {
                result.push(key)
            }
        }
        return result


        // return array.filter(it => !val.includes(it))      //高阶函数

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

    function xorBy(...array) {                                 //复制
        if (Array.isArray(array[array.length - 1])) {
            return xor(array[0], ...(array.slice(1)))
        }

        var after = array.pop()
        after = iteratee(after)

        var target = array.shift()
        var differ = [].concat(...array)
        if (Array.isArray(target)) {
            var ary1 = []
            var ary2 = []
            for (var key of target) {
                var nel1 = after(key)
                ary1.push(nel1)
            }
            for (var item of differ) {
                var nel2 = after(item)
                ary2.push(nel2)
            }
            var result = xor(ary1, ary2)

            var res = []
            var results = ary1.concat(ary2)
            var back = target.concat(differ)
            for (var key of result) {
                res.push(back[results.indexOf(key)])
            }

            return res
        }
    }

    function xorWith(objects, others, comparator) {
        var result = []
        var res = []
        var array = objects.concat(others)
        for (var key of objects) {
            for (var item of others) {
                if (comparator(key, item)) {
                    result.push(key)
                }
            }
        }
        for (var key of result) {
            for (var i = 0; i < array.length; i++) {
                if (!comparator(key, array[i])) {
                    res.push(array[i])
                }
            }
        }
        return res

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
    //collection

    function countBy(array, property) {                             //计数 
        var property = iteratee(property)
        var map = {}
        for (var key of array) {
            var item = property(key)
            if (item in map) {
                map[item]++
            } else {
                map[item] = 1
            }
        }
        return map
    }

    function every(array, predicate) {
        var f = iteratee(predicate)
        for (var key of array) {
            var item = f(key)
            if (!item) {
                return false
            }
        }
        return true
    }

    function filter(array, predicate) {
        var res = []
        var f = iteratee(predicate)
        for (var key of array) {
            var item = f(key)
            if (item) {
                res.push(key)
            }
        }
        return res
    }

    function find(array, predicate, fromIndex = 0) {

        var f = iteratee(predicate)
        for (var i = fromIndex; i < array.length; i++) {
            var item = f(array[i])
            if (item) {
                return array[i]
            }
        }

    }


    function findLast(array, predicate, fromIndex = array.length - 1) {

        var f = iteratee(predicate)
        for (var i = fromIndex; i >= 0; i--) {
            var item = f(array[i])
            if (item) {
                return array[i]
            }
        }

    }

    function flatMap(array, predicate) {
        var result = []
        var f = iteratee(predicate)
        for (var key of array) {
            result = result.concat(f(key))
        }
        return result
    }
    function flatMapDeep(array, predicate) {
        var result = flatMap(array, predicate)
        return flattenDeep(result)
    }


    function flatMapDepth(array, predicate, depth = 0) {
        var result = flatMap(array, predicate)
        return res = flattenDepth(result, depth - 1)
    }

    // function forEach(ary, action) {                               //可以断的foreach循环
    //     for (var i = 0; i < ary.length; i++) {
    //         if (action(ary[i], i, ary) === false) {
    //             break
    //         }
    //     }

    // }
    function forEach(ary, predicate) {
        var result = []
        if (Array.isArray(ary)) {
            for (var key of ary) {
                predicate(key)
            }
        } else if (typeof ary == "object") {
            for (var key in ary) {
                predicate(ary[key], key)
            }
        }
        return ary
    }

    function forEachRight(ary, predicate) {
        var result = []
        if (Array.isArray(ary)) {
            for (var i = ary.length - 1; i >= 0; i--) {
                predicate(ary[i])
            }
        } else if (typeof ary == "object") {
            var keys = []
            var vals = []
            for (var key in ary) {
                keys.push(key)
                vals.push(ary[key])
            }
            for (var i = keys.length - 1; i >= 0; i--) {
                predicate(vals[i], keys[i])
            }
        }
        return ary
    }

    function groupBy(array, predicate) {
        f = iteratee(predicate)
        var map = {}
        for (var val of array) {
            key = f(val)
            if (key in map) {
                map[key].push(val)
            } else {
                map[key] = [val]
            }
        }
        return map
    }

    function includes(array, value, fromIndex = 0) {
        if (Array.isArray(array)) {
            for (var i = fromIndex; i < array.length; i++) {
                if (array[i] == value) {
                    return true
                }
            }
            return false
        }
        if (typeof array == "string") {
            return Boolean(array.slice(fromIndex).match(value))

        }
        if (typeof array == "object") {

            for (var key in array) {

                if (array[key] == value && !fromIndex) return true
                fromIndex--
            }
            return false
        }
    }

    function invokeMap(array, path, ...args) {
        var res = [];
        if (typeof path == 'string') {
            res = array.map(it => it[path](...args));
        }
        if (typeof path == 'function') {
            res = array.map(it => path.apply(it, [...args]));
        }
        return res;
    }


    function keyBy(array, predicate) {
        var map = {}
        f = iteratee(predicate)
        for (var key in array) {
            let val = array[key]
            map[f(val)] = val
        }
        return map
    }

    function map(array, predicate) {
        var result = []
        predicate = iteratee(predicate)
        if (Array.isArray(array)) {
            for (var i = 0; i < array.length; i++) {
                result.push(predicate(array[i], i, array))
            }
        } else if (typeof array == "object") {
            for (var item in array) {
                if (predicate(array[item])) {
                    result.push(predicate(array[item]))
                }
            }
        }

        return result
    }


    // function orderBy(array, predicate, orders) {


    // }

    function partition(collection, predicate) {
        f = iteratee(predicate)
        var result = [[], []]
        collection.filter(it => {
            if (f(it)) result[0].push(it)
            if (!f(it)) result[1].push(it)
        })
        return result
    }

    function reduce(collection, predicate, accumulator) {
        for (var key in collection) {
            if (accumulator == undefined) {
                accumulator = collection[key]
                continue
            }
            accumulator = predicate(accumulator, collection[key], key)
        }
        return accumulator
    }

    function reduceRight(collection, iteratee, accumulator) {
        for (var i = collection.length; i >= 0; i--) {
            if (accumulator == undefined) {
                accumulator = collection[i]
                continue
            }
            accumulator = iteratee(accumulator, collection[i], i)
        }
        return accumulator.slice(1)
    }


    function reject(array, predicate) {
        var res = []
        var f = iteratee(predicate)
        for (var key of array) {
            var item = f(key)
            if (!item) {
                res.push(key)
            }
        }
        return res

    }

    function sample(collection) {
        if (Array.isArray(collection)) {
            return collection[Math.floor(Math.random() * (collection.length))]
        } else if (typeof collection == "object") {
            var res = []
            for (var key in collection) {
                res.push(collection[key])
            }
            return sample(res)
        }
    }
    function sampleSize(collection, n = 1) {
        var res = []
        for (var i = 1; i <= n && i <= collection.length; i++) {
            var digit = sample(collection)
            if (res.indexOf(digit) == -1) {
                res.push(digit)
            } else {
                i--
            }
        }
        return res
    }


    function shuffle(collection) {
        return sampleSize(collection, collection.length)
    }

    function size(collection) {
        if (Object.prototype.toString.call(collection) == "[object Object]") {
            return Object.keys(collection).length;
        }
        return collection.length;
    }


    function some(collection, predicate) {
        f = iteratee(predicate)
        for (var key in collection) {
            if (f(collection[key])) {
                return true
            }
        }
        return false
    }

    // function sortBy(collection, iteratees) {

    // }

    //function

    function ary(f, n = f.length) {
        return function (...args) {
            return f(...args.sliece(0, n))
        }
    }

    function defer(func, ...args) {
        return setTimeout(func, 0, ...args) - 1;
    }

    function delay(func, wait, [args]) {
        let timer = setTimeout(func, wait, ...args);
        return timer - 1;
    }

    function flip(func) {
        return function (...args) {
            return func(...args.reverse())
        }
    }

    // function memoize(func, resolver) {


    // }


    function negate(predicate) {
        return function (...args) {
            return !predicate(...args)
        }
    }
    function spread(func, start = 0) {
        return function (arys) {
            return func(arys.slice(start))

        }
    }


    // function spread(func) {
    //     return function (ary) {
    //         return func.apply(this, ary)
    //     }
    // }

    function unary(func) {
        return ary(func, 1);
    }


    //Lang
    function castArray(value) {
        if (arguments.length == 0) {
            return []
        } else if (Array.isArray(value)) {
            return value
        }
        return [value]
    }

    function clone(value) {
        return value
    }

    // function cloneDeep(value){

    // }
    function conformsTo(object, source) {
        for (var key in object) {
            if (f = source[key]) {
                return f(object[key])
            }
        }
    }


    function eq(value, other) {
        if (isNaN(value) && isNaN(other)) {
            return true
        } else {
            return value === other
        }
    }

    function gt(value, other) {
        return value > other
    }

    function gte(value, other) {
        return value >= other
    }

    function isArguments(value) {
        return Object.prototype.toString.call(value) === '[object Arguments]'
    }

    function isArray(value) {
        return Object.prototype.toString.call(value) === "[object object]"
    }

    function isArrayBuffer(val) {
        return Object.prototype.toString.call(val) === "[object ArrayBuffer]";
    }

    function isArrayLike(value) {
        if (typeof value == "function") return false
        if (value.length > 0 && value.length < Number.MAX_SAFE_INTEGER) {
            return true
        } else {
            return false
        }
    }

    function isArrayLikeObject(value) {
        return (isArrayLike(value) && isArray(value))

    }

    function isBoolean(value) {
        return Object.prototype.toString.call(value) === "[object Boolean]"
    }

    function isDate(value) {
        return Object.prototype.toString.call(value) === "[object Data]"
    }

    function isElement(value) {
        return Object.prototype.toString.call(value) === "[object HTMLBodyElement]"
    }

    function isEmpty(value) {
        for (var i in value) {
            return false
        }
        return true
    }

    function isEqual(value, other) {
        if (value === other) return true;         //直接比对
        if (value !== value && other !== other) return true;//NaN
        if (value == null || typeof value != "object" || other == null || typeof other != "object")  //为空
            return false;
        if (Object.keys(value).length !== Object.keys(other).length) {        //获得索引值 返回长度对比
            return false
        }
        for (let key in value) {                                              //返回索引内的匹配
            if (!(key in other) || !isEqual(value[key], other[key])) {
                return false
            }
        }
        return true

    }

    function isEqualWith(value, other, customizer) {
        if (customizer == undefined) {
            return isEqual(value, other)
        }
        for (var key in value) {
            if ((customizer(value[key], other[key])) == false) {
                return false
            }
        } return true
    }


    function isError(value) {
        return Object.prototype.toString.call(value) === "[object Error]"
    }


    function isFinite(value) {
        if (typeof value == "number" && value + 1 != value) {
            return true
        }
        return false
    }

    function isFunction(value) {
        if (typeof value == 'function') {
            return true
        }
        return false
    }

    function isInteger(value) {
        return isInteger(value)
    }

    function isLength(value) {
        return isInteger(value) && (value > 0 && value < 2 ** 32 - 1)
    }

    function isMap(value) {
        return Object.prototype.toString.call(value) == "[object Map]"
    }

    function isMatchWith(object, source, customizer) {
        if (customizer == undefined) {
            return isEqual(value, other)
        }
        for (var key in source) {
            if ((customizer(object[key], source[key])) == false) {
                return false
            }
        } return true
    }

    function isNaN(value) {
        return Number.isNaN(value)
    }

    function isNative(val) {
        return Function.prototype.toString.call(val) == "[native code]"

    }
    function isNil(value) {
        if (value == undefined || null) {
            return true
        } else {
            return false
        }
    }

    function isNull(value) {
        return Array.prototype.toString.call(value) == "[object Null]"
    }

    function isNumber(value) {
        return typeof value == "number"
    }

    function isObject(value) {
        return Array.prototype.toString.call(value) == "[object object]"
    }
    function isObjectLike(value) {
        if (isNull(value) || !isObject(value)) {
            return false
        }
    }
    function isRegExp(value) {
        return Object.prototype.toString.call(value) === '[object RegExp]'
    }

    function isSafeInteger(val) {
        return isNumber(val) && Math.abs(val) < Number.MAX_SAFE_INTEGER && Math.abs(val) > Number.MIN_VALUE
    }

    function isSet(value) {
        return Object.prototype.toString.call(value) == '[object Set]'
    }

    function isString(value) {
        return Object.prototype.toString.call(value) == '[object String]'
    }
    //Math    
    function add(augend, addend) {
        return result = augend + addend
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
        var result = {}
        for (var key in obj) {
            var val = obj[key]
            result[key] = mapper(val, key, obj)

        }
        return result
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








    function curry(f, length = f.length) {
        return function (...args) {
            if (args.length < length) {
                return curry(f.bind(null, ...args), length - args.length)
            } else {
                return f(...args)
            }
        }
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
        findLastIndex,
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
        dropRightWhile,
        dropWhile,
        intersectionBy,
        intersectionWith,
        pullAllBy,
        sortedIndexBy,
        sortedLastIndexBy,
        takeRightWhile,
        takeWhile,
        unionBy,
        unionWith,
        isEqual,
        pullAllWith,
        uniqBy,
        uniqWith,
        add,
        unzipWith,
        xorBy,
        xorWith,
        countBy,
        every,
        filter,
        find,
        findLast,
        flatMap,
        flatMapDeep,
        flatMapDepth,
        forEachRight,
        groupBy,
        includes,
        invokeMap,
        keyBy,
        map,
        curry,
        mapValues,
        partition,
        reduce,
        reduceRight,
        reject,
        sample,
        sampleSize,
        shuffle,
        size,
        some,
        ary,
        bind,
        defer,
        delay,
        flip,
        negate,
        unary,
        castArray,
        clone,
        conformsTo,
        eq,
        gt,
        gte,
        isArguments,
        isArray,
        isArrayBuffer,
        isArrayLike,
        isArrayLikeObject,
        isBoolean,
        isDate,
        isElement,
        isEmpty,
        isEqualWith,
        isError,
        isFinite,
        isMatchWith,
        isNative,
        isNaN,
        isNil,
        isNull,
        isLength,
        isMap,
        isFunction,
        isNumber,
        isObject,
        isObjectLike,
    }

}()
