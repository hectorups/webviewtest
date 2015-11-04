package io.tm9.webviewtest;

import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class RVAdapter extends RecyclerView.Adapter<RVAdapter.WebviewViewHolder> {

  public int getItemCount() {
    return 200;
  }

  @Override public WebviewViewHolder onCreateViewHolder(ViewGroup viewGroup, int i) {
    View v = LayoutInflater.from(viewGroup.getContext())
        .inflate(R.layout.webview_item, viewGroup, false);
    WebviewViewHolder pvh = new WebviewViewHolder(v);
    return pvh;
  }

  public static class WebviewViewHolder extends RecyclerView.ViewHolder {
    public WebView webview;

    WebviewViewHolder(View itemView) {
      super(itemView);
      webview = (WebView) itemView.findViewById(R.id.webview);
      webview.getSettings().setJavaScriptEnabled(true);
      webview.getSettings().setDomStorageEnabled(true);
      webview.getSettings().setAllowContentAccess(true);
      webview.getSettings().setAllowFileAccess(true);
      webview.setWebChromeClient(new WebChromeClient());
      webview.setVerticalScrollBarEnabled(false);
      webview.setHorizontalScrollBarEnabled(false);
      webview.setWebViewClient(new WebViewClient() {
        @Override public void onPageFinished(WebView view, String url) {
          webview.loadUrl("javascript:m2Init('')");
        }
      });

      webview.loadUrl("file:///android_asset/index.html");
    }
  }

  @Override public void onBindViewHolder(final WebviewViewHolder viewHolder, final int i) {

    viewHolder.webview.loadUrl("javascript:m2Init(" + i + ")");
  }

  @Override public void onAttachedToRecyclerView(RecyclerView recyclerView) {
    super.onAttachedToRecyclerView(recyclerView);
  }
}
