---
title: String源码
date: 2024-02-18
---
## 1. 属性

```java
/** The value is used for character storage. */
private final char value[];

/** Cache the hash code for the string */
private int hash; // Default to 0

/** use serialVersionUID from JDK 1.0.2 for interoperability */
private static final long serialVersionUID = -6849794470754667710L;
```

- 使用 final 修饰的 value。只能初始化一次，如果大量拼接，不可使用该类型
- 使用字符组进行缓存数据

## 2. 构造方法

### public String()

```java
/**
   * Initializes a newly created {@code String} object so that it represents
   * an empty character sequence.  Note that use of this constructor is
   * unnecessary since Strings are immutable.
   */
  public String() {
      this.value = "".value;
  }
```

- 通过设置"".value，实现创建对象.
- hash 值默认为 0。

### public String(String original)

```java
/**
 * Initializes a newly created {@code String} object so that it represents
 * the same sequence of characters as the argument; in other words, the
 * newly created string is a copy of the argument string. Unless an
 * explicit copy of {@code original} is needed, use of this constructor is
 * unnecessary since Strings are immutable.
 *
 * @param  original
 *         A {@code String}
 */
public String(String original) {
    this.value = original.value;
    this.hash = original.hash;
}
```

- 通过传入的字符串，设置对象，并且设置对应的 hash

### public String(char value[])

```java
/**
 * Allocates a new {@code String} so that it represents the sequence of
 * characters currently contained in the character array argument. The
 * contents of the character array are copied; subsequent modification of
 * the character array does not affect the newly created string.
 *
 * @param  value
 *         The initial value of the string
 */
public String(char value[]) {
    this.value = Arrays.copyOf(value, value.length);
}
```

- 通过传入的字符组进行复制，从而创建对象。

### public String(byte bytes[])

```java
    /**
    * Constructs a new {@code String} by decoding the specified array of bytes
    * using the platform's default charset.  The length of the new {@code
    * String} is a function of the charset, and hence may not be equal to the
    * length of the byte array.
    *
    * <p> The behavior of this constructor when the given bytes are not valid
    * in the default charset is unspecified.  The {@link
    * java.nio.charset.CharsetDecoder} class should be used when more control
    * over the decoding process is required.
    *
    * @param  bytes
    *         The bytes to be decoded into characters
    *
    * @since  JDK1.1
    */
   public String(byte bytes[]) {
       this(bytes, 0, bytes.length);
   }
```

- 通过字节组进行创建对象，调用该对象的其他方法，传入字节组，开始和结束的位置进行创建

### public String(StringBuffer buffer)

```java
/**
 * Allocates a new string that contains the sequence of characters
 * currently contained in the string buffer argument. The contents of the
 * string buffer are copied; subsequent modification of the string buffer
 * does not affect the newly created string.
 *
 * @param  buffer
 *         A {@code StringBuffer}
 */
public String(StringBuffer buffer) {
    synchronized(buffer) {
        this.value = Arrays.copyOf(buffer.getValue(), buffer.length());
    }
}
```

- 通过 StringBuffer 进行构建对象，通过 StringBufer.getValue()返回字符组，配合字符组长度创建对象
- StringBuffer 通过 synchronized 进行出现线程数据共享，由此可见 StringBuffer 是线程安全的

### public String(StringBuilder builder)

```java
/**
  * Allocates a new string that contains the sequence of characters
  * currently contained in the string builder argument. The contents of the
  * string builder are copied; subsequent modification of the string builder
  * does not affect the newly created string.
  *
  * <p> This constructor is provided to ease migration to {@code
  * StringBuilder}. Obtaining a string from a string builder via the {@code
  * toString} method is likely to run faster and is generally preferred.
  *
  * @param   builder
  *          A {@code StringBuilder}
  *
  * @since  1.5
  */
 public String(StringBuilder builder) {
     this.value = Arrays.copyOf(builder.getValue(), builder.length());
 }
```

- 和上个方法对比，可看出 StringBuilder 线程不安全。

## 3. 常用方法

### 字符串的长度 length()

```java
    /**
    * Returns the length of this string.
    * The length is equal to the number of <a href="Character.html#unicode">Unicode
    * code units</a> in the string.
    *
    * @return  the length of the sequence of characters represented by this
    *          object.
    */
   public int length() {
       return value.length;
   }
```

- 通过字符组的长度从而获得字符串的长度

### 是否为空 isEmpty()

```java
    /**
  * Returns {@code true} if, and only if, {@link #length()} is {@code 0}.
  *
  * @return {@code true} if {@link #length()} is {@code 0}, otherwise
  * {@code false}
  *
  * @since 1.6
  */
 public boolean isEmpty() {
     return value.length == 0;
 }
```

- 检测是否为空时未检测对象是否为 null，所以使用该方法时需要考虑是否为 null

### 获得字符串的第几个字符 charAt(int index)

```java
/**
 * Returns the {@code char} value at the
 * specified index. An index ranges from {@code 0} to
 * {@code length() - 1}. The first {@code char} value of the sequence
 * is at index {@code 0}, the next at index {@code 1},
 * and so on, as for array indexing.
 *
 * <p>If the {@code char} value specified by the index is a
 * <a href="Character.html#unicode">surrogate</a>, the surrogate
 * value is returned.
 *
 * @param      index   the index of the {@code char} value.
 * @return     the {@code char} value at the specified index of this string.
 *             The first {@code char} value is at index {@code 0}.
 * @exception  IndexOutOfBoundsException  if the {@code index}
 *             argument is negative or not less than the length of this
 *             string.
 */
public char charAt(int index) {
    if ((index < 0) || (index >= value.length)) {
        throw new StringIndexOutOfBoundsException(index);
    }
    return value[index];
}
```

- 通过传入的字符串的位置进行获取，如果不在返回内会抛出`StringIndexOutOfBoundsException`异常。

### 比较内容是否相等 equals(Object object)

```java
/**
 * Compares this string to the specified object.  The result is {@code
 * true} if and only if the argument is not {@code null} and is a {@code
 * String} object that represents the same sequence of characters as this
 * object.
 *
 * @param  anObject
 *         The object to compare this {@code String} against
 *
 * @return  {@code true} if the given object represents a {@code String}
 *          equivalent to this string, {@code false} otherwise
 *
 * @see  #compareTo(String)
 * @see  #equalsIgnoreCase(String)
 */
public boolean equals(Object anObject) {
    if (this == anObject) {
        return true;
    }
    if (anObject instanceof String) {
        String anotherString = (String)anObject;
        int n = value.length;
        if (n == anotherString.value.length) {
            char v1[] = value;
            char v2[] = anotherString.value;
            int i = 0;
            while (n-- != 0) {
                if (v1[i] != v2[i])
                    return false;
                i++;
            }
            return true;
        }
    }
    return false;
}
```

- 基本的数据类型相等的判断只需要`==`就可以判断，但是封装类型，需要通过 equals 进行判断。
- 如果需要对自定义对象进行判断是否相等，需要重写对象的`equals`方法，从而实现自定义比较方法。如果不重写，则默认比较内存地址。

### 忽略大小写比较是否相等 equalsIgnoreCase(String anotherString)

```java
/**
 * Compares this {@code String} to another {@code String}, ignoring case
 * considerations.  Two strings are considered equal ignoring case if they
 * are of the same length and corresponding characters in the two strings
 * are equal ignoring case.
 *
 * <p> Two characters {@code c1} and {@code c2} are considered the same
 * ignoring case if at least one of the following is true:
 * <ul>
 *   <li> The two characters are the same (as compared by the
 *        {@code ==} operator)
 *   <li> Applying the method {@link
 *        java.lang.Character#toUpperCase(char)} to each character
 *        produces the same result
 *   <li> Applying the method {@link
 *        java.lang.Character#toLowerCase(char)} to each character
 *        produces the same result
 * </ul>
 *
 * @param  anotherString
 *         The {@code String} to compare this {@code String} against
 *
 * @return  {@code true} if the argument is not {@code null} and it
 *          represents an equivalent {@code String} ignoring case; {@code
 *          false} otherwise
 *
 * @see  #equals(Object)
 */
public boolean equalsIgnoreCase(String anotherString) {
    return (this == anotherString) ? true
            : (anotherString != null)
            && (anotherString.value.length == value.length)
            && regionMatches(true, 0, anotherString, 0, value.length);
}
```

1. 进行判断对象的内存地址是否相同--->地址相同，说明同一个对象，自己比较自己肯定 true
2. 然后判断是否为空，长度是否相同，然后再循环比较每个字符忽略大小写比较

### 比较字符串的大小 compareTo(String anotherString)

```java

    /**
     * Compares two strings lexicographically.
     * The comparison is based on the Unicode value of each character in
     * the strings. The character sequence represented by this
     * {@code String} object is compared lexicographically to the
     * character sequence represented by the argument string. The result is
     * a negative integer if this {@code String} object
     * lexicographically precedes the argument string. The result is a
     * positive integer if this {@code String} object lexicographically
     * follows the argument string. The result is zero if the strings
     * are equal; {@code compareTo} returns {@code 0} exactly when
     * the {@link #equals(Object)} method would return {@code true}.
     * <p>
     * This is the definition of lexicographic ordering. If two strings are
     * different, then either they have different characters at some index
     * that is a valid index for both strings, or their lengths are different,
     * or both. If they have different characters at one or more index
     * positions, let <i>k</i> be the smallest such index; then the string
     * whose character at position <i>k</i> has the smaller value, as
     * determined by using the &lt; operator, lexicographically precedes the
     * other string. In this case, {@code compareTo} returns the
     * difference of the two character values at position {@code k} in
     * the two string -- that is, the value:
     * <blockquote>
<pre>
     * this.charAt(k)-anotherString.charAt(k)
     * </pre></blockquote>
     * If there is no index position at which they differ, then the shorter
     * string lexicographically precedes the longer string. In this case,
     * {@code compareTo} returns the difference of the lengths of the
     * strings -- that is, the value:
     * <blockquote>
<pre>
     * this.length()-anotherString.length()
     * </pre></blockquote>
     *
     * @param   anotherString   the {@code String} to be compared.
     * @return  the value {@code 0} if the argument string is equal to
     *          this string; a value less than {@code 0} if this string
     *          is lexicographically less than the string argument; and a
     *          value greater than {@code 0} if this string is
     *          lexicographically greater than the string argument.
     */
    public int compareTo(String anotherString) {
        int len1 = value.length;
        int len2 = anotherString.value.length;
        int lim = Math.min(len1, len2);
        char v1[] = value;
        char v2[] = anotherString.value;

        int k = 0;
        while (k < lim) {
            char c1 = v1[k];
            char c2 = v2[k];
            if (c1 != c2) {
                return c1 - c2;
            }
            k++;
        }
        return len1 - len2;
    }
```

1. 找出长度最短的字符串长度
2. 循环比较，如果有不相等的则返回插值
3. 一直想等则返回长度差值

### 判断字符串是否从某个字符串开始的 startsWith(String prefix, int toffset)

```java
/**
    * Tests if the substring of this string beginning at the
    * specified index starts with the specified prefix.
    *
    * @param   prefix    the prefix.
    * @param   toffset   where to begin looking in this string.
    * @return  {@code true} if the character sequence represented by the
    *          argument is a prefix of the substring of this object starting
    *          at index {@code toffset}; {@code false} otherwise.
    *          The result is {@code false} if {@code toffset} is
    *          negative or greater than the length of this
    *          {@code String} object; otherwise the result is the same
    *          as the result of the expression
    *
<pre>
    *          this.substring(toffset).startsWith(prefix)
    *          </pre>
*/
   public boolean startsWith(String prefix, int toffset) {
       char ta[] = value;
       int to = toffset;
       char pa[] = prefix.value;
       int po = 0;
       int pc = prefix.value.length;
       // Note: toffset might be near -1>>>1.
       if ((toffset < 0) || (toffset > value.length - pc)) {
           return false;
       }
       while (--pc >= 0) {
           if (ta[to++] != pa[po++]) {
               return false;
           }
       }
       return true;
   }
```

1. 获取对象的字符组、开始位置、传入的字符组，计算得出结束位置
2. 判断开始位置和结束位置是否超出
3. 循环比较是否相等

## 4. 常见问题

