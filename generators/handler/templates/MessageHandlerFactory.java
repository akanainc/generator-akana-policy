package <%= props.packageHandler %>;

import com.digev.fw.exception.GException;
import com.soa.message.handler.HandlerContext;
import com.soa.message.handler.HandlerFactory;
import com.soa.message.handler.HandlerRole;
import com.soa.message.handler.MessageHandler;

/**
 * Copyright (C) <%= new Date().getFullYear() %> Akana Inc. 
 * Author: <%= props.author %>  (<%= props.email %>)
 *	
 * Creates a <%= props.component %>MessageHandler().
 */
public class <%= props.component %>MessageHandlerFactory implements HandlerFactory {

    public MessageHandler create(HandlerContext context, 
    		                     HandlerRole    role) 
            throws GException {
        return new  <%= props.component %>MessageHandler();
    }
}
