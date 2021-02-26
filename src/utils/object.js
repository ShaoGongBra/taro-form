

/**
 * 递归设置value
 * @param {array} keys key数组
 * @param {object|array} data 被设置的对象
 * @param {any} value 要设置的值
 * @param {string} child 在递归时要调用的子集字段
 * @param {boolean} splice 使用使用splice插入数据 仅支持数组
 */
const recursionSetValue = (keys, data, value, childKey, splice = false) => {
  keys = typeof keys === 'string' ? [keys] : [...keys]
  if (keys.length === 1) {
    if (splice) {
      data.splice(keys[0], 0, value)
    } else {
      data[keys[0]] = value
    }
  } else {
    if (childKey && data[keys[0]][childKey] === undefined) {
      data[keys[0]][childKey] = []
    }
    recursionSetValue(keys.slice(1), childKey ? data[keys[0]][childKey] : data[keys[0]], value, childKey, splice)
  }
}

/**
 * 递归获取value
 * @param {array} keys key数组
 * @param {object|array} data 被获取的对象
 * @param {string} childKey 在递归时要调用的子集字段
 * @param {boolean} splice 是否将此值删除 仅支持数组
 */
const recursionGetValue = (keys, data = {}, childKey, splice = false) => {
  keys = typeof keys === 'string' ? [keys] : [...keys]
  if (keys.length === 1) {
    return splice ? data.splice(keys[0], 1)[0] : data[keys[0]]
  } else {
    return recursionGetValue(keys.slice(1), childKey === undefined ? data[keys[0]] : data[keys[0]][childKey], childKey, splice)
  }
}

/**
 * 检查一个值是否在给定的数组中 不在这返回指定的默认value
 * @param {any} value
 * @param {array} array
 * @param {any} defaultValue
 */
const verifyValueInArray = (value, array, defaultValue = array[0]) => {
  if (!value) return defaultValue
  if (array.indexOf(value) !== -1) return value
  return defaultValue
}

/**
 * 从数组中查找值是否在数组中
 * @param {string} value
 * @param {array} array
 * @param {string} key 表明要查找在数组是个三维数组 这个表示这个在对象中的键名
 */
const getInArrayIndex = (value, array, key) => {
  if (key !== undefined) {
    for (let i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        return i
      }
    }
    return -1
  } else {
    return array.indexOf(value)
  }
}

/**
 * 将对象或数组转化为Object形式的的字符串
 * @param {any} value 将要序列化成 一个 JSON 字符串的值
 * @param {number} space 指定缩进用的空白字符串，用于美化输出（pretty-print）；如果参数是个数字，它代表有多少的空格；上限为10。该值若小于1，则意味着没有空格；如果该参数为字符串（当字符串长度超过10个字母，取其前10个字母），该字符串将被作为空格；如果该参数没有提供（或者为 null），将没有空格。
 * @param {boolean} simplify 是否简化输出 简化后对于不需要引号括起来的字符串 将没有引号
 * @return {string} 序列化后的字符串
 */
const objectToString = (() => {
  const rx_key = /^[A-Za-z0-9_]*$/
  const rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g

  let gap
  let indent
  let meta
  let rep
  let simpl

  function quote(string, isKey) {

    // If the string contains no control characters, no quote characters, and no
    // backslash characters, then we can safely slap some quotes around it.
    // Otherwise we must also replace the offending characters with safe escape
    // sequences.

    rx_escapable.lastIndex = 0
    return rx_escapable.test(string)
      ? "\"" + string.replace(rx_escapable, function (a) {
        var c = meta[a];
        return typeof c === "string"
          ? c
          : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
      }) + "\""
      : (simpl && isKey && rx_key.test(string) ? string : "\"" + string + "\"");
  }


  function str(key, holder) {

    // Produce a string from holder[key].

    var i;          // The loop counter.
    var k;          // The member key.
    var v;          // The member value.
    var length;
    var mind = gap;
    var partial;
    var value = holder[key];

    // If the value has a toJSON method, call it to obtain a replacement value.

    if (
      value
      && typeof value === "object"
      && typeof value.toJSON === "function"
    ) {
      value = value.toJSON(key);
    }

    // If we were called with a replacer function, then call the replacer to
    // obtain a replacement value.

    if (typeof rep === "function") {
      value = rep.call(holder, key, value);
    }

    // What happens next depends on the value's type.

    switch (typeof value) {
      case "string":
        return quote(value);

      case "number":

        // JSON numbers must be finite. Encode non-finite numbers as null.

        return (Number.isFinite(value))
          ? String(value)
          : "null";

      case "boolean":
      case "null":

        // If the value is a boolean or null, convert it to a string. Note:
        // typeof null does not produce "null". The case is included here in
        // the remote chance that this gets fixed someday.

        return String(value);

      // If the type is "object", we might be dealing with an object or an array or
      // null.

      case "object":

        // Due to a specification blunder in ECMAScript, typeof null is "object",
        // so watch out for that case.

        if (!value) {
          return "null";
        }

        // Make an array to hold the partial results of stringifying this object value.

        gap += indent;
        partial = [];

        // Is the value an array?

        if (Object.prototype.toString.apply(value) === "[object Array]") {

          // The value is an array. Stringify every element. Use null as a placeholder
          // for non-JSON values.

          length = value.length;
          for (i = 0; i < length; i += 1) {
            partial[i] = str(i, value) || "null";
          }

          // Join all of the elements together, separated with commas, and wrap them in
          // brackets.

          v = partial.length === 0
            ? "[]"
            : gap
              ? (
                "[\n"
                + gap
                + partial.join(",\n" + gap)
                + "\n"
                + mind
                + "]"
              )
              : "[" + partial.join(",") + "]";
          gap = mind;
          return v;
        }

        // If the replacer is an array, use it to select the members to be stringified.

        if (rep && typeof rep === "object") {
          length = rep.length;
          for (i = 0; i < length; i += 1) {
            if (typeof rep[i] === "string") {
              k = rep[i];
              v = str(k, value);
              if (v) {
                partial.push(quote(k, true) + (
                  (gap)
                    ? ": "
                    : ":"
                ) + v);
              }
            }
          }
        } else {

          // Otherwise, iterate through all of the keys in the object.

          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
              v = str(k, value);
              if (v) {
                partial.push(quote(k, true) + (
                  (gap)
                    ? ": "
                    : ":"
                ) + v);
              }
            }
          }
        }

        // Join all of the member texts together, separated with commas,
        // and wrap them in braces.

        v = partial.length === 0
          ? "{}"
          : gap
            ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
            : "{" + partial.join(",") + "}";
        gap = mind;
        return v;
    }
  }

  // If the JSON object does not yet have a stringify method, give it one.

  meta = {    // table of character substitutions
    "\b": "\\b",
    "\t": "\\t",
    "\n": "\\n",
    "\f": "\\f",
    "\r": "\\r",
    "\"": "\\\"",
    "\\": "\\\\"
  };
  return (value, replacer, space, simplify = false) => {

    // The stringify method takes a value and an optional replacer, and an optional
    // space parameter, and returns a JSON text. The replacer can be a function
    // that can replace values, or an array of strings that will select the keys.
    // A default replacer method can be provided. Use of the space parameter can
    // produce text that is more easily readable.

    simpl = simplify

    var i;
    gap = "";
    indent = "";

    // If the space parameter is a number, make an indent string containing that
    // many spaces.

    if (typeof space === "number") {
      for (i = 0; i < space; i += 1) {
        indent += " ";
      }

      // If the space parameter is a string, it will be used as the indent string.

    } else if (typeof space === "string") {
      indent = space;
    }

    // If there is a replacer, it must be a function or an array.
    // Otherwise, throw an error.

    rep = replacer;
    if (replacer && typeof replacer !== "function" && (
      typeof replacer !== "object"
      || typeof replacer.length !== "number"
    )) {
      throw new Error("JSON.stringify");
    }

    // Make a fake root object containing our value under the key of "".
    // Return the result of stringifying the value.

    return str("", { "": value });
  }
})()

export {
  recursionSetValue,
  recursionGetValue,
  verifyValueInArray,
  getInArrayIndex,
  objectToString
}
