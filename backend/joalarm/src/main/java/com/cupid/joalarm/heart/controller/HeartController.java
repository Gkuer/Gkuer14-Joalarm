package com.cupid.joalarm.heart.controller;

import com.cupid.joalarm.heart.dto.HeartDTO;
import com.cupid.joalarm.heart.dto.HeartTypeDTO;
import com.cupid.joalarm.heart.entity.HeartEntity;
import com.cupid.joalarm.heart.service.HeartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RequiredArgsConstructor
@Controller
public class HeartController {
    private final HeartService heartService;

    @MessageMapping("/heart")
    public void sendHeart(HeartDTO DTO) {
        heartService.logHeartUser(DTO.getSendUser(), DTO.getReceiveUsers());
        heartService.sendHeart(DTO.getSendUser(), DTO.getReceiveSessions());
    }

    @GetMapping("/heart/sendheartlist")
    public ResponseEntity<List<HeartEntity>> sendHeartList(long user) {
        return new ResponseEntity<>(heartService.SendHeartList(user), HttpStatus.OK);
    }

}
