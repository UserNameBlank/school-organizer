package com.schoolorganizer.app

import android.content.Context
import android.os.Bundle
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import androidx.webkit.WebViewAssetLoader
import androidx.webkit.WebViewAssetLoader.InternalStoragePathHandler
import com.getcapacitor.Bridge
import com.getcapacitor.BridgeActivity
import com.getcapacitor.BridgeWebViewClient
import com.schoolorganizer.app.database.DatabasePlugin
import com.schoolorganizer.app.settings.PreferencesPlugin
import java.io.File

class MainActivity : BridgeActivity() {

    companion object {
        const val RESOURCE_URL = "https://appassets.androidplatform.net"
        const val IMAGE_RESOURCE_URL = "$RESOURCE_URL/images"
    }

    class CustomWebViewClient(
        bridge: Bridge,
        context: Context
    ) : BridgeWebViewClient(bridge) {

        private val loader = WebViewAssetLoader.Builder()
            .addPathHandler("/images/",
                InternalStoragePathHandler(context, File(context.filesDir, "images"))
            ).build()

        override fun shouldInterceptRequest(
            view: WebView?,
            request: WebResourceRequest?
        ): WebResourceResponse? {
            return loader.shouldInterceptRequest(request!!.url)
                ?: super.shouldInterceptRequest(view, request)
        }

    }

    override fun onCreate(savedInstanceState: Bundle?) {
        registerPlugin(PreferencesPlugin::class.java)
        registerPlugin(DatabasePlugin::class.java)

        super.onCreate(savedInstanceState)

        bridge.webViewClient = CustomWebViewClient(bridge, baseContext)
    }
}
