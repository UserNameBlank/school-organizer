package com.schoolorganizer.app;

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.widget.Toast;

import com.getcapacitor.BridgeActivity;
import com.schoolorganizer.app.database.DatabasePlugin;
import com.schoolorganizer.app.settings.PreferencesPlugin;

public class MainActivity extends BridgeActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        registerPlugin(PreferencesPlugin.class);
        registerPlugin(DatabasePlugin.class);

//        if (Build.VERSION.SDK_INT >= 33)
//            requestPermissions(new String[]{Manifest.permission.POST_NOTIFICATIONS}, 7);

        super.onCreate(savedInstanceState);
    }

//    @Override
//    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
//        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
//        if (requestCode == 7) {
//            if (grantResults.length != 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
//                Toast.makeText(this, "Permission granted", Toast.LENGTH_SHORT).show();
//            } else {
//                Toast.makeText(this, "Permission denied", Toast.LENGTH_SHORT).show();
//            }
//        }
//    }
}
