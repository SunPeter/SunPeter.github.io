
# [参照官方文档][1]！ 其他的都是骗子

[1]:https://help.github.com/articles/creating-project-pages-manually

1 新建username.github.io 的仓库  
2 `clone down `   
3 `git checkout —orphan gh-pages  `  
> 创建一个没有父节点的分支gh-pages。因为github规定，只有该分支中的页面，才会生成网页文件  
4 `git rm -rf .`    
5 `printf “content” >index.html  `  
6 `add / commit  `  
7 `git push origin gh-pages `   
