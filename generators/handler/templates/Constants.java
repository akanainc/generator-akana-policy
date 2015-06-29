package <%= props.constantsPackage %>;

import javax.xml.namespace.QName;


/**
 * Copyright (C) <%= new Date().getFullYear() %> Akana Inc. 
 * Author: <%= props.author %> (<%= props.email %>)
 *
 * MessageHandler implementation that logs the content of a message.
 */

public interface <%= props.component %>Constants {

		// namespace of our policy
		public static final String POLICY_NS = "urn:<%= props.namespace %>";
		// QName of our policy assertion
		public static final QName  POLICY_QNAME = new QName(POLICY_NS, "Settings");
	
}