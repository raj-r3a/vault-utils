## Functions

<dl>
<dt><a href="#connectVault">connectVault(connectionDetails-)</a> ⇒ <code>any</code></dt>
<dd><p>Function that looks up VAULT_TOKEN details and if renewable token takes care of it..</p>
</dd>
<dt><a href="#decrypt">decrypt(cipherText, connection-connection)</a> ⇒ <code>any</code></dt>
<dd><p>Function that decrypts the cipherText</p>
</dd>
<dt><a href="#encrypt">encrypt(data, connection-connection)</a> ⇒ <code>string</code></dt>
<dd><p>Function that encrypts the provided data with vault transit engine</p>
</dd>
</dl>

<a name="connectVault"></a>

## connectVault(connectionDetails-) ⇒ <code>any</code>
Function that looks up VAULT_TOKEN details and if renewable token takes care of it..

**Kind**: global function  
**Returns**: <code>any</code> - return the connection Object that will have token, url of Vault  

| Param | Type | Description |
| --- | --- | --- |
| connectionDetails- | <code>Object</code> | optional |

<a name="decrypt"></a>

## decrypt(cipherText, connection-connection) ⇒ <code>any</code>
Function that decrypts the cipherText

**Kind**: global function  
**Returns**: <code>any</code> - return the decrypted data. Datatype will be same as that of passed to encrypt  

| Param | Type | Description |
| --- | --- | --- |
| cipherText | <code>string</code> |  |
| connection-connection | <code>object</code> | object returned from connect vault function (optional) |

<a name="encrypt"></a>

## encrypt(data, connection-connection) ⇒ <code>string</code>
Function that encrypts the provided data with vault transit engine

**Kind**: global function  
**Returns**: <code>string</code> - return the encrypted cipher text  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>any</code> |  |
| connection-connection | <code>object</code> | object returned from connect vault function (optional) |

