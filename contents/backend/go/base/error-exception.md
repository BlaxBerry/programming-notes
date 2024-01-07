# 异常

```go
package main

import (
	"errors"
	"fmt"
)

func main() {
	err := errors.New("xxx")
	fmt.Println(err)
}


// "xxx"
```
