package <%= props.templatePackage %>;

import javax.xml.namespace.QName;

import com.digev.fw.exception.GException;
import <%= props.assertionPackage %>.*;
import <%= props.handlerPackage %>.*;
import <%= props.constantsPackage %>.*;
import com.soa.policy.template.AttachmentPoints;
import com.soa.policy.template.OperationalPolicyTemplate;
import com.soa.policy.template.PolicyVisibility;
import com.soa.policy.wspolicy.Policy;


public class <%= props.component %>Template implements OperationalPolicyTemplate{
	
	/* can attach a single policy to an entire WSDL binding, a binding operation, or an
	 * endpoint (wsdl port).
	 */
	private static final String[] SUPPORTED_SUBJECTS = {
		AttachmentPoints.POLICY_ATTACH_POINT_TYPE_BINDING,
		AttachmentPoints.POLICY_ATTACH_POINT_TYPE_BINDING_OPERATION,
		AttachmentPoints.POLICY_ATTACH_POINT_TYPE_ENDPOINT			
	};
	
	private static final QName[] SUPPORTED_ASSERTIONS = {
		<%= props.component %>Constants.POLICY_QNAME
	};
	
	/* Return the supported subjects. */
	public String[] getAttachmentSubjects() {
		return SUPPORTED_SUBJECTS;
	}

	public String[] getSupportedBindingTypes() {
		return null;
	}

	/* Used for identifying if a container supports the policy */
	public String getCapabilityUri() {
		return <%= props.component %>Constants.POLICY_NS;
	}

	/* Returns a default policy configuration */
	public Policy getDefaultConfiguration() throws GException {
		
		<%= props.component %>Assertion assertion = new <%= props.component %>Assertion();
		assertion.setName(<%= props.component %>Constants.POLICY_QNAME);
		// wrap in a Policy
		Policy policy = new Policy();
		policy.add(assertion);
		return policy;
	}

	/* Returns whether or not it should be visible in WSDL served up from PM */
	public String getVisibility() {
		// this policy needs to be implemented by a consumer so it is public
		return PolicyVisibility.POLICY_PUBLIC_VISIBILITY;
	}

	/* Return the qname of our assertion */
	public QName[] getAssertionQNames() {
		return SUPPORTED_ASSERTIONS;
	}
	
	/* Only one policy of this type is supported at a time, no merging. Merging would
	 * have to be implemented in the policy handler factory.
	 */
	public boolean supportsMerges() {
		return false;
	}
	
	/* Returns a unique id for our policy used for displaying the policy name in PM.
	 * It's a key to a resource. This needs to be specified in the handler-osgi.xml as the value of the key id
	 */
	public String getId() {
		return "policy.<%= props.component.toLowerCase() %>";
	}

}
