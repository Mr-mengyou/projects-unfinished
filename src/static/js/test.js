 function matchType(array) {
     let obj = {}
     array.forEach((item) => {
         if (!obj[item['awardName']])
             obj[item['awardName']] = [item['awardName']]
     })
     let year = []
     array.forEach((item) => {
         if (year.indexOf(item.awardDate) == -1) year.push(item.awardDate)
     })
     for (let key in obj) {
         for (let i = 0; i < year.length; i++) {
             if (
                 array.find((item) => {
                     if (item.awardName == key && item.awardDate == year[i])
                         return true
                 }) !== undefined
             )
                 continue
             else {
                 array.push({
                     awardName: key,
                     awardDate: year[i],
                     count: 0
                 })
             }
         }
     }
     for (let i = 0; i < year.length; i++) {
         for (let j = 0; j < array.length; j++) {
             if (array[j].awardDate == year[i]) {
                 if (array[j].count !== 0) {
                     obj[array[j].awardName].push(array[j].count)
                 } else {
                     obj[array[j].awardName].push(0)
                 }
             }
         }
     }
     let keyArr = []
     for (let key in obj) {
         keyArr.push(obj[key])
     }
     return keyArr
 }

 function majorType(array) {
     let obj = {}
     array.forEach((item) => {
         if (!obj[item['awardMajor']])
             obj[item['awardMajor']] = [item['awardMajor']]
     })
     let year = []
     array.forEach((item) => {
         if (year.indexOf(item.awardDate) == -1) year.push(item.awardDate)
     })
     for (let key in obj) {
         for (let i = 0; i < year.length; i++) {
             if (
                 array.find((item) => {
                     if (item.awardMajor == key && item.awardDate == year[i])
                         return true
                 }) !== undefined
             )
                 continue
             else {
                 array.push({
                     awardMajor: key,
                     awardDate: year[i],
                     count: 0
                 })
             }
         }
     }
     for (let i = 0; i < year.length; i++) {
         for (let j = 0; j < array.length; j++) {
             if (array[j].awardDate == year[i]) {
                 if (array[j].count !== 0) {
                     obj[array[j].awardMajor].push(array[j].count)
                 } else {
                     obj[array[j].awardMajor].push(0)
                 }
             }
         }
     }
     let keyArr = []
     for (let key in obj) {
         keyArr.push(obj[key])
     }
     return keyArr
 }

 function departType(array) {
     let obj = {}
     array.forEach((item) => {
         if (!obj[item['awardBelong']])
             obj[item['awardBelong']] = [item['awardBelong']]
     })
     let year = []
     array.forEach((item) => {
         if (year.indexOf(item.awardDate) == -1) year.push(item.awardDate)
     })
     for (let key in obj) {
         for (let i = 0; i < year.length; i++) {
             if (
                 array.find((item) => {
                     if (item.awardBelong == key && item.awardDate == year[i])
                         return true
                 }) !== undefined
             )
                 continue
             else {
                 array.push({
                     awardBelong: key,
                     awardDate: year[i],
                     count: 0
                 })
             }
         }
     }
     for (let i = 0; i < year.length; i++) {
         for (let j = 0; j < array.length; j++) {
             if (array[j].awardDate == year[i]) {
                 if (array[j].count !== 0) {
                     obj[array[j].awardBelong].push(array[j].count)
                 } else {
                     obj[array[j].awardBelong].push(0)
                 }
             }
         }
     }
     let keyArr = []
     for (let key in obj) {
         keyArr.push(obj[key])
     }
     return keyArr
 }
 export { matchType, majorType, departType }