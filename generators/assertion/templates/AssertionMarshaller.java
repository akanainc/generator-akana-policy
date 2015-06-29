package <%= props.marshallerPackage %>;


import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.namespace.QName;

import org.w3c.dom.Element;

import com.digev.fw.exception.GException;
import com.digev.fw.log.Log;
import com.soa.policy.PolicyErrorCode;
import com.soa.policy.wspolicy.Assertion;
import com.soa.policy.wspolicy.AssertionMarshaller;
import com.soa.policy.wspolicy.JavaAssertion;
import com.soa.policy.wspolicy.JaxbAssertionMarshaller;
import com.soa.policy.wspolicy.Policy;


import <%= props.constantsPackage %>.*;
import <%= props.assertionPackage %>.*;
import <%= props.modelPackage %>.*;

@XmlSeeAlso(Settings.class)
public class <%= props.component %>AssertionMarshaller implements AssertionMarshaller {
	
private static QName[] supportedAssertions = new QName[] { <%= props.component %>Constants.POLICY_QNAME};
	
	private JaxbAssertionMarshaller jaxbMarshaller; 
	private static Log log = Log.getLog(<%= props.component %>AssertionMarshaller.class);
	public void setJaxbMarshaller(JaxbAssertionMarshaller jaxbMarshaller) {
        this.jaxbMarshaller = jaxbMarshaller;
    }
	
	@Override
	public QName[] getSupportedAssertions() {
		return supportedAssertions;
	}

	@Override
	public void marshal(Assertion assertion, Element element) throws GException {
		if(assertion instanceof <%= props.component %>Assertion) {
			
			Settings settings = (Settings)((<%= props.component %>Assertion)assertion).getObject();
			if (settings == null) { // in case it wasn't constructed completely
				settings = new Settings();
				((<%= props.component %>Assertion)assertion).setObject(settings);
				((<%= props.component %>Assertion)assertion).setName(<%= props.component %>Constants.POLICY_QNAME);
			}
			this.jaxbMarshaller.marshal(assertion, element);
		} else {
			throw new GException(PolicyErrorCode.UNSUPPORTED_ASSERTION);
		}
		
	}

	@Override
	public Assertion unmarshal(Element element) throws GException {
		<%= props.component %>Assertion assertion = new <%= props.component %>Assertion();
		JavaAssertion javaAssertion = (JavaAssertion)this.jaxbMarshaller.unmarshal(element);
		if(javaAssertion.getObject() instanceof Settings) {
			Settings settings = (Settings)javaAssertion.getObject(); 
			((<%= props.component %>Assertion)assertion).setObject(settings); 
		}
		else {
			throw new GException(PolicyErrorCode.UNSUPPORTED_ASSERTION);
		}
		
		return assertion;
	}

	@Override
	public Assertion unmarshal(Element element, Policy subPolicy)
			throws GException {
		throw new GException(PolicyErrorCode.SUB_POLICY_NOT_SUPPORTED);
	}

	
}
