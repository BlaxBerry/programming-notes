# 互联网基础相关

## 互联网分层模型

互联网的逻辑分为好几层，每层都有各种的功能

::: tip 根据划分的层次不同分为：

- OSI 七层模型
- TCP/IP 五层模型 ( 常用 )
- TCP/IP 四层模型

:::

<table>
  <thead>
    <th colspan="2" style="text-align: center;">OSI 七层模型</th>
    <th colspan="2" style="text-align: center;">TCP/IP 五层模型</th>
    <th colspan="2" style="text-align: center;">TCP/IP 四层模型</th>
  </thead>

  <tbody>
    <tr>
      <td>第七层</td>
      <td>应用层<br/><small>( Application Layer )</small></td>
      <th rowspan="3">第五层</th>
      <th rowspan="3">应用层<br/><small>( Application Layer )</small></th>
      <td rowspan="3">第四层</td>
      <td rowspan="3">应用层<br/><small>( Application Layer )</small></td>
    </tr>
    <tr>
      <td>第六层</td>
      <td>表示层<br/><small>( Presentation Layer )</small></td> 
    </tr>
    <tr>
      <td>第五层</td>
      <td>会话层<br/><small>( Session Layer )</small></td> 
    </tr>
    <tr>
      <td>第四层</td>
      <td>传输层<br/><small>( Transport Layer )</small></td> 
      <th>第四层</th>
      <th>传输层<br/><small>( Transport Layer )</small></th> 
      <td>第三层</td>
      <td>传输层<br/><small>( Transport Layer )</small></td> 
    </tr>
    <tr>
      <td>第三层</td>
      <td>网络层<br/><small>( Network Layer )</small></td> 
      <th>第三层</th>
      <th>网络层<br/><small>( Network Layer )</small></th> 
      <td>第二层</td>
      <td>网络层<br/><small>( Network Layer )</small></td> 
    </tr>
    <tr>
      <td>第二层</td>
      <td>数据连接层<br/><small>( Data Link Layer )</small></td> 
      <th>第二层</th>
      <th>数据连接层<br/><small>( Data Link Layer )</small></th> 
      <td rowspan="2">第一层</td>
      <td rowspan="2">网络接口层<br/><small>( Link Layer )</small></td> 
    </tr>
    <tr>
      <td>第一层</td>
      <td>物理层<br/><small>( Physical Layer )</small></td> 
      <th>第一层</th>
      <th>物理层<br/><small>( Physical Layer )</small></th> 
    </tr>
  </tbody>
</table>

<style module>
td {
  background-color: var(--vp-c-bg); 
}
</style>

## 互联网协议

互联网的核心是一系列的协议，规定了电脑的连接与组网

- TCP 协议
- HTTP 协议
- TCP socket 协议
  Web Socket 是基于 TCP 的一种新的应用层网络协议。
  可实现服务器端与客户端的实时双向通信，浏览器与服务器只需要一次握手，二者就可直接创建持久性的连接，并进行双向数据传输

## Web Assembly

WASM
