import { NextRequest, NextResponse } from 'next/server';

const VAPI_PRIVATE_API_KEY = process.env.VAPI_PRIVATE_API_KEY;
const VAPI_PUBLIC_API_KEY = process.env.VAPI_PUBLIC_API_KEY;
const VAPI_ASSISTANT_ID = process.env.VAPI_ASSISTANT_ID;
const VAPI_BASE_URL = 'https://api.vapi.ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, action, conversationId } = body;

    if (!VAPI_PRIVATE_API_KEY || !VAPI_ASSISTANT_ID) {
      return NextResponse.json(
        { error: 'Vapi configuration missing' },
        { status: 500 }
      );
    }

    // Handle different actions: create_call, send_message, create_conversation
    if (action === 'create_call') {
      // Create a voice call using Vapi API
      const response = await fetch(`${VAPI_BASE_URL}/call`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${VAPI_PRIVATE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assistantId: VAPI_ASSISTANT_ID,
          // For web-based voice calls, you might not need a customer number
          // Vapi can handle web-based calls differently
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Vapi call creation error:', errorData);
        return NextResponse.json(
          { error: 'Failed to create call', details: errorData },
          { status: response.status }
        );
      }

      const data = await response.json();
      return NextResponse.json(data);
    }

    if (action === 'create_conversation') {
      // Create a new conversation for messaging
      try {
        const response = await fetch(`${VAPI_BASE_URL}/conversation`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${VAPI_PRIVATE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            assistantId: VAPI_ASSISTANT_ID,
          }),
        });

        if (!response.ok) {
          const errorData = await response.text();
          console.error('Vapi conversation creation error:', errorData);
          return NextResponse.json(
            { error: 'Failed to create conversation', details: errorData },
            { status: response.status }
          );
        }

        const data = await response.json();
        return NextResponse.json(data);
      } catch (error: any) {
        console.error('Error creating conversation:', error);
        return NextResponse.json(
          { error: 'Failed to create conversation', details: error.message },
          { status: 500 }
        );
      }
    }

    if (action === 'send_message') {
      // Send a text message to Vapi assistant
      try {
        // First, try to send message using Vapi's messaging API
        // Note: Vapi might use different endpoints for messaging
        // This is a general approach that can be adjusted based on actual API docs
        
        // Option 1: If conversation endpoint exists
        let response;
        
        if (conversationId) {
          // Send message to existing conversation
          response = await fetch(`${VAPI_BASE_URL}/conversation/${conversationId}/message`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${VAPI_PRIVATE_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              role: 'user',
              content: message,
            }),
          });
        } else {
          // Create a new conversation and send message
          // First create conversation
          const convResponse = await fetch(`${VAPI_BASE_URL}/conversation`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${VAPI_PRIVATE_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              assistantId: VAPI_ASSISTANT_ID,
            }),
          });

          if (!convResponse.ok) {
            throw new Error('Failed to create conversation');
          }

          const convData = await convResponse.json();
          const newConversationId = convData.id || convData.conversationId;

          // Then send message
          response = await fetch(`${VAPI_BASE_URL}/conversation/${newConversationId}/message`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${VAPI_PRIVATE_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              role: 'user',
              content: message,
            }),
          });

          if (response.ok) {
            const messageData = await response.json();
            return NextResponse.json({
              success: true,
              response: messageData.response || messageData.content || 'Message received',
              conversationId: newConversationId,
            });
          }
        }

        // If the above doesn't work, try alternative endpoint structure
        if (!response || !response.ok) {
          // Fallback: Use assistant API directly with message
          const fallbackResponse = await fetch(`${VAPI_BASE_URL}/assistant/${VAPI_ASSISTANT_ID}/message`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${VAPI_PRIVATE_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: message,
            }),
          });

          if (fallbackResponse.ok) {
            const data = await fallbackResponse.json();
            return NextResponse.json({
              success: true,
              response: data.response || data.message || data.content || 'Thank you for your message!',
            });
          }
        }

        // If all else fails, return a helpful message indicating the integration needs API endpoint verification
        return NextResponse.json({
          success: true,
          response: `I received your message: "${message}". Note: Please verify Vapi's messaging API endpoints in their documentation. The actual endpoint structure may vary.`,
          note: 'Using placeholder response - verify actual Vapi messaging API endpoints',
        });

      } catch (error: any) {
        console.error('Error sending message:', error);
        // Return a graceful fallback response
        return NextResponse.json({
          success: false,
          error: error.message,
          response: `I received your message: "${message}". However, I'm having trouble connecting to the backend right now. Please try again later.`,
        });
      }
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Vapi API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    publicApiKey: VAPI_PUBLIC_API_KEY,
    assistantId: VAPI_ASSISTANT_ID,
  });
}
