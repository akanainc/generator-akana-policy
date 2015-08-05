package <%= props.handlerPackage %>;


import java.util.Collection;

import com.digev.fw.exception.GException;
import com.digev.fw.log.Log;
import com.soa.message.ParameterType;
import com.soa.message.handler.HandlerContext;
import com.soa.message.handler.HandlerRole;
import com.soa.message.handler.MessageHandler;
import com.soa.message.handler.wsdl.WSDLHandlerContext;
import com.soa.policy.wspolicy.Assertion;
import com.soa.policy.wspolicy.Policy;
import com.soa.policy.wspolicy.PolicyOperator;
import com.soa.policy.wspolicy.handler.ChoiceIdentifier;
import com.soa.policy.wspolicy.handler.PolicyChoices;
import com.soa.policy.wspolicy.handler.PolicyHandlerFactoryCapability;
import com.soa.policy.wspolicy.handler.WSPHandlerFactory;
import com.soa.policy.wspolicy.util.PolicyUtils;

import <%= props.constantsPackage %>.*;
import <%= props.assertionPackage %>.*;
import <%= props.modelPackage %>.*;


public class <%= props.component %>WSPHandlerFactory implements WSPHandlerFactory{
	
		// capability stating support for the policy
		private static PolicyHandlerFactoryCapability policyHanderFactoryCapability;
		private static Log log = Log.getLog(<%= props.component %>WSPHandlerFactory.class);
		static {
			policyHanderFactoryCapability = new PolicyHandlerFactoryCapability();	
			policyHanderFactoryCapability.addSupportedAssertionNamespace(<%= props.component%>Constants.POLICY_NS);		
		}
		
		/* Creates a ComplexPolicyHandler if the simple policy is present. The handler will be
		 * created for IN, OUT, and FAULT messages.
		 * 
		 * The handler is presented a set of policy choices, policies in an exactlyOne or "OR"
		 * condition. Policy Manager does not support "OR" at the top level of a a policy
		 * and this policy is only applicable at the root level, so only once choice should be
		 * presented.
		 */
		public MessageHandler create(PolicyChoices policyChoices,
				HandlerContext context, HandlerRole role) throws GException {
			MessageHandler handler = null;
			
			for(ChoiceIdentifier id : (Collection<ChoiceIdentifier>) policyChoices.getChoiceIdentifiers()) { 
				Policy policy = policyChoices.getChoice(id);
				Assertion assertion = PolicyUtils.getAssertion(policy, <%= props.component %>Assertion.class);
				if(assertion != null){
					<%= props.component %>Policy settings = (<%= props.component %>Policy)((<%= props.component %>Assertion)assertion).getObject();
					log.info("<%= props.component %>WSPHandlerFactory invoked: " + role.toString() + ((WSDLHandlerContext)context).getParameterType().toString());
	            	if (role == HandlerRole.PROVIDER && ((WSDLHandlerContext)context).getParameterType() == ParameterType.IN) {
	            		handler = new  <%= props.component %>MessageHandler();
	            		((<%= props.component %>MessageHandler)handler).set<%= props.component %>Policy(settings);
	            	}else if(role == HandlerRole.CONSUMER && ((WSDLHandlerContext)context).getParameterType() == ParameterType.IN){
	            		// Add your Consumer IN MessageHandler here!
	            	}
	            	break;
				}
				
			}
			return handler;
		}

		/* Return the policy we support */
		public PolicyHandlerFactoryCapability getCapability() {
			return policyHanderFactoryCapability;
		}

		/* Find the policy assertion we support, if present */
		private Assertion getAssertion(PolicyOperator policyOperator) {
			Assertion assertion = null;
			
			// first check if present in policy operator's immediate child assertions
			for (Assertion _assertion : policyOperator.getAssertions()) {
				if (_assertion.getName().equals(<%= props.component%>Constants.POLICY_QNAME)) {
					assertion = _assertion;
					break;
				}
			}
			/* could be a normalized policy. there are no choices in a policy choice so we can simply
			 * search sub policy operators without worrying about exactlyOnes.
			 */
			if (assertion == null) {
				for (PolicyOperator _policyOperator : policyOperator.getPolicyOperators()) {
					if ((assertion = getAssertion(_policyOperator)) != null) {
						break;
					}
				}
			}
			return assertion;
		}

}