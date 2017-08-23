module VideosHelper
  def default_intro(video)
    return cl_video_tag("default_intro", controls: true) if video.nil?
    cl_video_tag(video.private_id, controls: true, transformation: @overlays)
  end

  def jobreel_default_intro(video)

    return cl_video_tag("default_intro", controls: true) if video.nil?
    jsonvideo = JSON.parse(video)
    ev = []
    firstvid = jsonvideo.shift
    jsonvideo.each do |vid|
      ev << {:overlay=>"video:" + vid, :flags=>"splice", :width=>333, :height=>188, :crop=>"fill"}
    end
    overlays = [{:width=>333, :height=>188, :crop=>"fill"}]
    overlays << ev
    overlays.flatten!
    cl_video_tag(firstvid, controls: true, transformation: overlays)
  end

end
