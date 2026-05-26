package com.baohaus.gooseword;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(GooseWordServerPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
