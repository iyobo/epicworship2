/**
 * Created by iyobo on 2016-07-14.
 */
var unsorted = [30,2,5,12,21,100,50,30]

function swap(arr,a,b){
	var buf = arr[a]
	arr[a]=arr[b]
	arr[b]=buf
}
function quicksort(arr,start,end){
	var pi = end;
	var wi = 0;

	for(var ci=start;ci<=end;ci++){
		if(pi==ci){
			//end of this iteration
			swap(arr,wi,unsorted.length-1)

			// quicksort(arr,wi,pi)
		}else if(arr[ci]<arr[pi]){
			swap(arr,ci,wi);
			wi++;
		}
	}
}

quicksort(unsorted,0,unsorted.length-1);

console.log(unsorted);