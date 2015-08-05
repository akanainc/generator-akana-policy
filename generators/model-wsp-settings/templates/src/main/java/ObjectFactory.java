package <%= props.modelPackage %>;

import javax.xml.bind.annotation.XmlRegistry;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the <%= props.modelPackage %> package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {


    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: policy.awesome.akana.com
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link <%= props.component %>Policy }
     * 
     */
    public <%= props.component %>Policy create<%= props.component %>Policy() {
        return new <%= props.component %>Policy();
    }

    /**
     * Create an instance of {@link <%= props.component %>Policy.Setting }
     * 
     */
    public <%= props.component %>Policy.Setting create<%= props.component %>PolicySetting() {
        return new <%= props.component %>Policy.Setting();
    }

}
