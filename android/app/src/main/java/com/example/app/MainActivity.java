// package com.example.app;

// import com.getcapacitor.BridgeActivity;

// public class MainActivity extends BridgeActivity {}

package com.example.app; // Make sure this matches your package name

import android.os.Bundle; // Import the Bundle class
import com.getcapacitor.BridgeActivity; // Import BridgeActivity
import com.ionicframework.capacitor.Checkout; // Correct import for Razorpay Checkout

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Register the Razorpay Checkout plugin
        registerPlugin(Checkout.class);
    }
}

