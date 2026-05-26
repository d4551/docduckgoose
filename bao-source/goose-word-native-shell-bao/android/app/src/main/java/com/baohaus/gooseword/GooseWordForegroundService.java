package com.baohaus.gooseword;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Intent;
import android.os.Build;
import android.os.IBinder;
import androidx.core.app.NotificationCompat;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class GooseWordForegroundService extends Service {
    public static final String CHANNEL_ID = "goose_word_server";
    public static final String EXTRA_PORT = "port";
    public static final String EXTRA_DATA_DIR = "dataDir";
    private Process serverProcess;

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        int port = intent.getIntExtra(EXTRA_PORT, 8080);
        String dataDir = intent.getStringExtra(EXTRA_DATA_DIR);
        if (dataDir == null || dataDir.isEmpty()) {
            dataDir = getFilesDir().getAbsolutePath() + "/goose-word";
        }
        startForeground(1, buildNotification());
        IOException failure = launchEmbeddedServer(port, dataDir);
        if (failure != null) {
            android.util.Log.e("GooseWordServer", failure.getMessage());
        }
        return START_STICKY;
    }

    private Notification buildNotification() {
        NotificationManager manager = getSystemService(NotificationManager.class);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel =
                new NotificationChannel(CHANNEL_ID, "Goose Word", NotificationManager.IMPORTANCE_LOW);
            manager.createNotificationChannel(channel);
        }
        return new NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Goose Word")
            .setContentText("Embedded server running")
            .setSmallIcon(android.R.drawable.stat_notify_sync)
            .build();
    }

    private IOException launchEmbeddedServer(int port, String dataDir) {
        try {
            File dataRoot = new File(dataDir);
            if (!dataRoot.exists()) {
                dataRoot.mkdirs();
            }
            File binary = new File(getFilesDir(), "goose-word-android-arm64");
            if (!binary.exists()) {
                copyAssetBinary(binary);
            }
            binary.setExecutable(true);
            ProcessBuilder builder = new ProcessBuilder(binary.getAbsolutePath());
            builder.directory(dataRoot);
            builder.environment().put("GOOSE_WORD_DATA_DIR", dataDir);
            builder.environment().put("GOOSE_WORD_PORT", String.valueOf(port));
            builder.redirectErrorStream(true);
            Process started = builder.start();
            serverProcess = started;
            Thread logThread = new Thread(() -> drainProcessLogs(started));
            logThread.start();
            return null;
        } catch (IOException error) {
            return error;
        }
    }

    private void drainProcessLogs(Process process) {
        try {
            InputStream stream = process.getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(stream));
            String line = reader.readLine();
            while (line != null) {
                android.util.Log.i("GooseWordServer", line);
                line = reader.readLine();
            }
        } catch (IOException error) {
            android.util.Log.e("GooseWordServer", error.getMessage());
        }
    }

    private void copyAssetBinary(File target) throws IOException {
        InputStream input = openAssetStream();
        if (input == null) {
            throw new IOException("goose-word-android-arm64 asset missing");
        }
        FileOutputStream output = new FileOutputStream(target);
        byte[] buffer = new byte[8192];
        int read = input.read(buffer);
        while (read > 0) {
            output.write(buffer, 0, read);
            read = input.read(buffer);
        }
        input.close();
        output.close();
    }

    private InputStream openAssetStream() throws IOException {
        try {
            return getAssets().open("goose-word-android-arm64");
        } catch (IOException first) {
            return getAssets().open("public/goose-word-android-arm64");
        }
    }

    @Override
    public void onDestroy() {
        if (serverProcess != null) {
            serverProcess.destroy();
            serverProcess = null;
        }
        super.onDestroy();
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
