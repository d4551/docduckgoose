package com.baohaus.gooseword;

import android.content.Intent;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "GooseWordServer")
public class GooseWordServerPlugin extends Plugin {
    @PluginMethod
    public void detect(PluginCall call) {
        JSObject result = new JSObject();
        result.put("platform", "android");
        call.resolve(result);
    }

    @PluginMethod
    public void start(PluginCall call) {
        int port = call.getInt("port", 8080);
        String dataDir = call.getString("dataDir", "");
        Intent intent = new Intent(getContext(), GooseWordForegroundService.class);
        intent.putExtra(GooseWordForegroundService.EXTRA_PORT, port);
        intent.putExtra(GooseWordForegroundService.EXTRA_DATA_DIR, dataDir);
        getContext().startForegroundService(intent);
        JSObject result = new JSObject();
        result.put("running", true);
        result.put("loopbackUrl", "http://127.0.0.1:" + port);
        result.put("platform", "android");
        call.resolve(result);
    }

    @PluginMethod
    public void stop(PluginCall call) {
        Intent intent = new Intent(getContext(), GooseWordForegroundService.class);
        getContext().stopService(intent);
        JSObject result = new JSObject();
        result.put("stopped", true);
        call.resolve(result);
    }

    @PluginMethod
    public void getStatus(PluginCall call) {
        JSObject result = new JSObject();
        result.put("running", true);
        result.put("loopbackUrl", "http://127.0.0.1:8080");
        result.put("platform", "android");
        call.resolve(result);
    }

    @PluginMethod
    public void injectDeviceContext(PluginCall call) {
        JSObject result = new JSObject();
        result.put("ok", true);
        call.resolve(result);
    }
}
