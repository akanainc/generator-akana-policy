package <%= props.assertionPackage %>;

import javax.xml.bind.annotation.XmlSeeAlso;

import com.digev.fw.log.Log;
import <%= props.modelPackage %>.*;
import com.soa.policy.wspolicy.JavaAssertion;

/**
 * Copyright (C) <%= new Date().getFullYear() %> Akana Inc. 
 * Author: <%= props.author %> (<%= props.email %>)
 *
 * Assertion implementation that sets the Settings object
 */


@XmlSeeAlso(Settings.class)
public class <%= props.component %>Assertion extends JavaAssertion {
	private static Log log = Log.getLog(<%= props.component %>Assertion.class);
	
	public void setObject(Object object) {
		try{ 
			if(object instanceof Settings)
				super.setObject(object);
			else{
				throw new RuntimeException("The object " + object + " is not of type Settings");
			} 
		}
		catch (Throwable t){
			log.error(t);	 
		} 
	}
}