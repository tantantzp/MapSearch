package data;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class TrieNode{
	Character character = '~';
	Set<String> gramSet;
	Map<Character,TrieNode> children;
	
	public TrieNode(){
		gramSet = new HashSet<String>();
		children = new HashMap<Character,TrieNode>();
	}
	
	public void addGram(String gram,int index){
		if(gram == null)	return;
		gramSet.add(gram);
		if(gram.length() <= index){
			return;
		}
		Character tchar = gram.charAt(index);
		TrieNode nNode = null;
		if(children.containsKey(tchar)){
			nNode = children.get(tchar);
		}else{
			nNode = new TrieNode();
			nNode.character = tchar;
			children.put(tchar, nNode);
		}
		nNode.addGram(gram,index+1);
	}

	
	public Set<String> prefixSearch(String prefix){
		if(prefix == null) return null;
		if(prefix.length() < 1) return gramSet;
		Character tchar = prefix.charAt(0);
		if(children.containsKey(tchar)){
			TrieNode child = children.get(tchar);
			String subPrefix = prefix.substring(1);
			return child.prefixSearch(subPrefix);
		}else{
			return null;
		}
	}
}
