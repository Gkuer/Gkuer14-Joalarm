package com.cupid.joalarm

import android.Manifest
import android.content.Context
import android.content.DialogInterface
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Bundle
import android.provider.Settings
import android.util.Log
import android.webkit.JavascriptInterface
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.core.content.ContextCompat.startActivity
import androidx.core.content.PermissionChecker.checkCallingOrSelfPermission



class PermissionInterface(private val mContext: Context) {
    @JavascriptInterface
    fun alertMsg(arg: String?) { // 웹뷰내의 페이지에서 호출하는 함수
//        var handler: Handler
//        handler.post {
            Toast.makeText(mContext, arg, Toast.LENGTH_SHORT).show()
//    }
    }

    @JavascriptInterface
    fun showToast(toast: String) {
        Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show()
    }

    @JavascriptInterface
    fun requestLocationPermission() {
        val permissions = arrayOf(
            Manifest.permission.ACCESS_COARSE_LOCATION,
            Manifest.permission.ACCESS_FINE_LOCATION,
            Manifest.permission.ACCESS_BACKGROUND_LOCATION
        )
        var allAllowed = true
        for (permission in permissions) {
            // 권한 여부 체크
            val check = checkCallingOrSelfPermission(mContext,permission)
            if (check == PackageManager.PERMISSION_DENIED) {
                // 권한 거부 상태라면, 사용자에게 권한 허용여부를 확인하는 창을 띄움
                // 허가가 안되어 있는 권한을 요청한다.
                allAllowed = false

            }
        }
        if(!allAllowed) requestPermissionDialog()
//        if (!allAllowed) ActivityCompat.requestPermissions(
//            this, permissions,
//            PERMISSION_ACCESS_ALL
//        )
    }

    private fun requestPermissionDialog() {
        var dialog = AlertDialog.Builder(mContext)
            .setTitle("서비스 이용 알림")
            .setMessage("필수 권한을 허용해야 서비스 정상 이용이 가능합니다. 설정 > 앱 관리 > joalarm > 권한 메뉴에서 항상 허용 후 이용해주세요")
            .setPositiveButton("허용하러가기",
                DialogInterface.OnClickListener { dialog, which ->
                    Log.d("dialog", "dialog")
                    // 앱 정보 화면까지 이동
                    val appDetailIntent = Intent(
                        Settings.ACTION_APPLICATION_DETAILS_SETTINGS, Uri.parse(
                            "package:${mContext.packageName}"
                        )
                    )
                    appDetailIntent.addCategory(Intent.CATEGORY_DEFAULT)
                    appDetailIntent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
                    startActivity(mContext,appDetailIntent, Bundle())
                }
            )
            .show()
    }
}