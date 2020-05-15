# BST

二叉排序树/二叉查找树/BST(binary search tree),具有以下性质：

- 若它的左子树不空，则左子树上所有结点的值均小于根结点的值；
- 若它的右子树不空，则右子树上所有结点的值均大于根结点的值；
- 它的左右子树也都是二叉排序树。
- 中序遍历可以得到一个递增序列

## 1.创建节点对象

```java
@Data
public class TreeNode {
    private Integer val;
    private TreeNode left;
    private TreeNode right;
}
```

## 2.创建方法

## 3.插入方法

## 4.查询方法

通过传入参数进行查询出对应的节点

```java
 /**
     * 查询
     *
     * @param e
     *            对象
     * @return TreeNode
     */
    public TreeNode search(Integer e) {
        TreeNode current = treeNode;
        while (current != null && current.getVal() != null && current.getVal() != e) {
            if (current.getVal() > e) {
                current = current.getLeft();
            } else {
                current = current.getRight();
            }
        }
        return current;
    }
```
