# <%= props.title %><% if (props.description) { %>

<%= props.description %><% } %>

## Requirements

- [Java SE](http://www.oracle.com/technetwork/java/javase/overview)
- [Ant](http://ant.apache.org)


Create symlink to the `lib` folder under your Policy Manager installation directory.

```bash
ln -s $AKANA_HOME/sm72/lib/ lib
```

To build

```bash
cd build
ant
```

Take the built jar file and drop it under the $AKANA_HOME/sm72/instances/$ND_INSTANCE_NAME/deploy folder


*** FOR WSPHandlerFactory only
Use sample-policy.xml as a starting point to configure XML Operational Policy in Policy Manager

---

Copyright &copy; <%= new Date().getFullYear() %> <%= props.author %>.
