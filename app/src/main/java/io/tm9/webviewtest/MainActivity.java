package io.tm9.webviewtest;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;

public class MainActivity extends AppCompatActivity {

  @Override protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    RecyclerView rv = (RecyclerView) findViewById(R.id.rv);
    rv.setHasFixedSize(true);
    LinearLayoutManager llm = new LinearLayoutManager(this);
    rv.setLayoutManager(llm);

    RVAdapter adapter = new RVAdapter();
    rv.setAdapter(adapter);
  }
}
