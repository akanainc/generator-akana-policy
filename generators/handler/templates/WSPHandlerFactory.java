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



public class <%= props.component %>WSPHandlerFactory implements WSPHandlerFactory{
	
		// capability stating support for the policy
		private static PolicyHandlerFactoryCapability gCapability;
		private static Log log = Log.getLog(<%= props.component %>WSPHandlerFactory.class);
		static {
			gCapability = new PolicyHandlerFactoryCapability();			
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
				
			}
			return handler;
		}

		/* Return the policy we support */
		public PolicyHandlerFactoryCapability getCapability() {
			return gCapability;
		}
}