# <%= props.title %><% if (props.description) { %>

<%= props.description %><% } %>

## Requirements

- [Java SE](http://www.oracle.com/technetwork/java/javase/overview)
- [Ant](http://ant.apache.org)
- [Maven] (http://maven.apache.org)

Create symlink to the `lib` folder under your Policy Manager installation directory.

```bash
ln -s $AKANA_HOME/sm72/lib/ lib
```


To generate an Eclipse project

```bash
mvn eclipse:eclipse
```

To build

```bash
cd build
ant
```

To deploy the build

Take the built jar file and drop it under the `$AKANA_HOME/sm72/instances/$ND_INSTANCE_NAME/deploy` folder


**For WSPHandlerFactory only**

Use sample-policy.xml as a starting point to configure XML Operational Policy in Policy Manager

Attach the policy to your Service or the API. 

Tail ND logs to verify `Settings` are logged (you might have to adjust log4j log settings under the `/admin` console)

---

Copyright &copy; <%= new Date().getFullYear() %> <%= props.author %>.
