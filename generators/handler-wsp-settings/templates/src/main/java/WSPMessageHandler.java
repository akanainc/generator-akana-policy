package <%= props.handlerPackage %>;

import java.io.StringWriter;

import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.stream.StreamResult;

import com.digev.fw.log.Log;
import com.digev.fw.log.LogLevel;
import com.soa.fw.transform.SOATransformer;
import com.soa.message.handler.MessageContext;
import com.soa.message.handler.MessageFaultException;
import com.soa.message.handler.MessageHandler;

import <%= props.modelPackage %>.*;

/**
 * Copyright (C) <%= new Date().getFullYear() %> Akana Inc. 
 * Author: <%= props.author %> (<%= props.email %>)
 *
 * MessageHandler implementation that logs the content of a message.
 */

public class <%= props.component %>MessageHandler implements MessageHandler {

    private static final Log log = Log.getLog(<%= props.component %>MessageHandler.class);
	
    private <%= props.component %>Policy settings = null;

    public void close(MessageContext context) {
        // Any cleanup code goes here
    }

    /* Logs the content of the message */
    public boolean handleMessage(MessageContext context)
            throws MessageFaultException {
        try {
            // get the message from the context
            Source msgContent = context.getMessage().getContent();
            // log the message content as an informative message
            log.info("<%= props.component %>MessageHandler: " + msgToString(msgContent));

            // log policy settings
            for(<%= props.component %>Policy.Setting setting: settings.getSetting()){
                log.info("<%= props.component %>MessageHandler: " + setting.getKey() +":"+ setting.getValue());
            }

            return true; // continue handler processing
        } catch (Exception e) {
            throw new MessageFaultException(e);
        }
    }

    /* Transforms the Source content of a message to a String for 
     * logging. 
     */
    private String msgToString(Source msg) throws Exception {
        Transformer xformer = 
                TransformerFactory.newInstance().newTransformer();
        /* We use an SOATransformer because it will reset buffered streams
         * after transformation whereas the typical Transformer implementation
         * will close the stream and cause errors later in the framework's
         * message processing.
         */
        xformer = new SOATransformer(xformer);
        StringWriter writer = new StringWriter();
        StreamResult result = new StreamResult(writer);
        xformer.transform(msg, result);
        return writer.toString();
    }

    public void set<%= props.component %>Policy(<%= props.component %>Policy settings){
        this.settings = settings;
    }

    public <%= props.component %>Policy get<%= props.component %>Policy(){
        return this.settings;
    }
}
